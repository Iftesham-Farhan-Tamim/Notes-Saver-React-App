import React, { useState, useEffect } from "react";

const EditPaste = ({ paste, onSave }) => {
    const [content, setContent] = useState(paste?.content || "");
    const [originalContent, setOriginalContent] = useState(paste?.content || "");
    const [isUpdated, setIsUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setContent(paste?.content || "");
        setOriginalContent(paste?.content || "");
    }, [paste]);

    const handleChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
        setIsUpdated(newContent !== originalContent);
    };

    const handleUpdate = async () => {
        if (!isUpdated) return; // Prevent update if no changes are made

        setLoading(true);
        try {
            const response = await fetch(`/api/pastes/${paste._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                setOriginalContent(content); // Update the original content
                setIsUpdated(false); // Reset the updated flag
                onSave(content); // Trigger onSave callback
            }
        } catch (error) {
            console.error("Update failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow-md">
            <h2 className="text-lg font-bold mb-2">Edit Paste</h2>
            <textarea
                value={content}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-gray-100"
                rows="8"
            />

            <div className="mt-3">
                <button
                    onClick={handleUpdate}
                    disabled={!isUpdated || loading}
                    className={`px-4 py-2 text-white rounded ${
                        isUpdated
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}
                >
                    {loading ? "Updating..." : "Update"}
                </button>

                <button
                    onClick={() => setContent(originalContent)}
                    className="ml-2 px-4 py-2 bg-gray-500 rounded text-white"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditPaste;
