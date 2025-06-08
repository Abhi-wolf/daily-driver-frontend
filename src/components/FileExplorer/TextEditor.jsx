import { useCallback, useEffect, useState, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "../ui/button";
import { useFileUpdateContent } from "../../hooks/fileExplorer/useFile";
import { toast } from "sonner";
import { Edit3, Eye, Save, FileText } from "lucide-react";

const SAVE_INTERVAL_MS = 5000; // Auto-save every 5 seconds
const MANUAL_SAVE_DEBOUNCE = 1000; // Debounce manual saves

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["blockquote", "code-block"],
  ["link"],
  ["clean"],
];

const TextEditor = ({ note, fileId, fileName }) => {
  const [quill, setQuill] = useState(null);
  const [editable, setEditable] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedContent, setLastSavedContent] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(fileId);

  const autoSaveIntervalRef = useRef(null);
  const saveTimeoutRef = useRef(null);
  const { updateFileContent, isUpdatingFileContent } =
    useFileUpdateContent(fileId);

  // Reset initialization when fileId changes
  useEffect(() => {
    if (currentFileId !== fileId) {
      setIsInitialized(false);
      setCurrentFileId(fileId);
      setHasUnsavedChanges(false);
      setLastSavedContent("");
      setEditable(false); // Reset to view mode when switching files
    }
  }, [fileId, currentFileId]);

  // Initialize Quill editor
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        history: {
          delay: 1000,
          maxStack: 500,
          userOnly: true,
        },
      },
      placeholder: "Start writing your note...",
    });

    q.disable();
    q.setText("Loading...");
    setQuill(q);

    // Apply Tailwind classes to Quill elements after initialization
    setTimeout(() => {
      const toolbar = wrapper.querySelector(".ql-toolbar");
      const container = wrapper.querySelector(".ql-container");
      const editor = wrapper.querySelector(".ql-editor");

      if (toolbar) {
        toolbar.className =
          "ql-toolbar ql-snow border-0 border-b border-gray-200 p-3 bg-gray-50 sticky top-0 z-10";
      }
      if (container) {
        container.className = "ql-container ql-snow flex-1 border-0";
      }
      if (editor) {
        editor.className = "ql-editor px-12 py-8 text-gray-800";
        editor.style.minHeight = "calc(100vh - 200px)";
        editor.style.fontFamily =
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
        editor.style.fontSize = "16px";
        editor.style.lineHeight = "1.6";
      }
    }, 0);
  }, []);

  // Initialize or update content when note changes
  useEffect(() => {
    if (
      quill &&
      note !== undefined &&
      (!isInitialized || currentFileId !== fileId)
    ) {
      try {
        if (note && note.trim()) {
          // If note contains HTML, convert it to Delta format
          if (note.includes("<")) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = note;
            quill.clipboard.dangerouslyPasteHTML(note);
          } else {
            quill.setText(note);
          }
        } else {
          quill.setText("");
        }

        setLastSavedContent(note || "");
        setHasUnsavedChanges(false);
        setIsInitialized(true);
        quill.enable();
      } catch (error) {
        console.error("Error loading content:", error);
        quill.setText("Error loading content");
        quill.enable();
      }
    }
  }, [quill, note, isInitialized, fileId, currentFileId]);

  // Handle content changes
  useEffect(() => {
    if (quill == null || !isInitialized) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;

      const currentContent = quill.root.innerHTML;
      const hasChanges = currentContent !== lastSavedContent;
      setHasUnsavedChanges(hasChanges);

      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Debounced save for frequent changes
      saveTimeoutRef.current = setTimeout(() => {
        if (hasChanges && editable) {
          saveContent(currentContent, false); // Silent save
        }
      }, MANUAL_SAVE_DEBOUNCE);
    };

    quill.on("text-change", handler);
    return () => {
      quill.off("text-change", handler);
    };
  }, [quill, lastSavedContent, editable, isInitialized]);

  // Auto-save functionality
  useEffect(() => {
    if (quill == null || !editable || !isInitialized) return;

    autoSaveIntervalRef.current = setInterval(() => {
      const currentContent = quill.root.innerHTML;
      if (currentContent !== lastSavedContent && hasUnsavedChanges) {
        saveContent(currentContent, false); // Silent auto-save
      }
    }, SAVE_INTERVAL_MS);

    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
    };
  }, [quill, editable, lastSavedContent, hasUnsavedChanges, isInitialized]);

  // Update editor editable state
  useEffect(() => {
    if (quill && isInitialized) {
      if (editable) {
        quill.enable();
      } else {
        quill.disable();
      }

      // Update styling based on edit mode
      const container = quill.container;
      const toolbar = container.parentElement?.querySelector(".ql-toolbar");

      if (editable) {
        container.classList.remove(
          "bg-gray-50",
          "border",
          "border-gray-200",
          "rounded-lg",
          "m-4",
          "shadow-sm"
        );
        if (toolbar) toolbar.classList.remove("hidden");
      } else {
        container.classList.add(
          "bg-gray-50",
          "border",
          "border-gray-200",
          "rounded-lg",
          "m-4",
          "shadow-sm"
        );
        if (toolbar) toolbar.classList.add("hidden");
      }
    }
  }, [quill, editable, isInitialized]);

  // Save content function
  const saveContent = useCallback(
    async (content = null, showToast = true) => {
      if (!quill || !fileId) return;

      const contentToSave = content || quill.root.innerHTML;

      // Don't save if content hasn't changed
      if (contentToSave === lastSavedContent) {
        if (showToast) toast.info("No changes to save");
        return;
      }

      try {
        await updateFileContent(
          { data: contentToSave, fileId },
          {
            onSuccess: () => {
              if (showToast) toast.success("File saved successfully");
              setLastSavedContent(contentToSave);
              setHasUnsavedChanges(false);
            },
            onError: (err) => {
              if (showToast) toast.error(err?.message || "Failed to save file");
            },
          }
        );
      } catch (error) {
        if (showToast) toast.error("Failed to save file");
      }
    },
    [quill, fileId, updateFileContent, lastSavedContent]
  );

  // Manual save
  const handleManualSave = useCallback(() => {
    saveContent(null, true);
  }, [saveContent]);

  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (editable && hasUnsavedChanges) {
      const shouldSave = window.confirm(
        "You have unsaved changes. Do you want to save before switching to view mode?"
      );
      if (shouldSave) {
        saveContent(null, true);
      }
    }
    setEditable(!editable);
  }, [editable, hasUnsavedChanges, saveContent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveIntervalRef.current) {
        clearInterval(autoSaveIntervalRef.current);
      }
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="border-b bg-white shadow-sm sticky top-0 z-20">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-gray-500" />
              <h1 className="text-lg font-semibold text-gray-800 truncate max-w-md">
                {fileName || "Untitled"}
              </h1>
              {hasUnsavedChanges && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Unsaved changes
                </span>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleEditMode}
                className="flex items-center space-x-2"
              >
                {editable ? (
                  <>
                    <Eye className="h-4 w-4" />
                    <span>View Mode</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Mode</span>
                  </>
                )}
              </Button>

              {editable && (
                <Button
                  onClick={handleManualSave}
                  disabled={isUpdatingFileContent || !hasUnsavedChanges}
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    hasUnsavedChanges
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400"
                  }`}
                >
                  <Save className="h-4 w-4" />
                  <span>{isUpdatingFileContent ? "Saving..." : "Save"}</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-5xl mx-auto">
          <div className={`h-full ${editable ? "bg-white" : "bg-gray-50"}`}>
            <div ref={wrapperRef} className="h-full flex flex-col" />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t bg-gray-50 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>{editable ? "Editing" : "Read-only"} mode</span>
            <span>Auto-save: {editable ? "On" : "Off"}</span>
          </div>
          <div className="flex items-center space-x-4">
            {isUpdatingFileContent && (
              <span className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                <span>Saving...</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
