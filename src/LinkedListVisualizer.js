import React, { useState } from 'react';
import { ArrowRight, Plus, Trash, Search, Edit, RefreshCw } from 'lucide-react';

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [position, setPosition] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [message, setMessage] = useState('');
  const [complexityInfo, setComplexityInfo] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState([]);
  const [currentOperation, setCurrentOperation] = useState(null);

  const clearHighlights = () => {
    setHighlightedNodes([]);
    setCurrentOperation(null);
  };

  const showOperation = (nodes, highlightIndex) => {
    setHighlightedNodes([...highlightIndex]);
    setTimeout(clearHighlights, 1500);
  };

  // Insert at beginning - O(1)
  const insertAtHead = (value) => {
    if (!value) return;
    const newNodes = [value, ...nodes];
    setNodes(newNodes);
    setNewValue('');
    setMessage('Inserted at head');
    setComplexityInfo('Time: O(1) | Space: O(1)');
    showOperation(newNodes, [0]);
  };

  // Insert at end - O(1) with tail pointer
  const insertAtTail = (value) => {
    if (!value) return;
    const newNodes = [...nodes, value];
    setNodes(newNodes);
    setNewValue('');
    setMessage('Inserted at tail');
    setComplexityInfo('Time: O(1) with tail pointer | Space: O(1)');
    showOperation(newNodes, [newNodes.length - 1]);
  };

  // Insert at position - O(n)
  const insertAtPosition = (value, pos) => {
    if (!value || pos < 0 || pos > nodes.length) return;
    const newNodes = [...nodes.slice(0, pos), value, ...nodes.slice(pos)];
    setNodes(newNodes);
    setNewValue('');
    setPosition('');
    setMessage(`Inserted at position ${pos}`);
    setComplexityInfo('Time: O(n) | Space: O(1)');
    showOperation(newNodes, [pos]);
  };

  // Delete from beginning - O(1)
  const deleteFromHead = () => {
    if (nodes.length === 0) return;
    setHighlightedNodes([0]);
    setTimeout(() => {
      setNodes(nodes.slice(1));
      setMessage('Deleted from head');
      setComplexityInfo('Time: O(1) | Space: O(1)');
      clearHighlights();
    }, 1000);
  };

  // Delete from end - O(n)
  const deleteFromTail = () => {
    if (nodes.length === 0) return;
    setHighlightedNodes([nodes.length - 1]);
    setTimeout(() => {
      setNodes(nodes.slice(0, -1));
      setMessage('Deleted from tail');
      setComplexityInfo('Time: O(n) | Space: O(1)');
      clearHighlights();
    }, 1000);
  };

  // Delete at position - O(n)
  const deleteAtPosition = (pos) => {
    if (pos < 0 || pos >= nodes.length) return;
    setHighlightedNodes([pos]);
    setTimeout(() => {
      const newNodes = [...nodes.slice(0, pos), ...nodes.slice(pos + 1)];
      setNodes(newNodes);
      setPosition('');
      setMessage(`Deleted at position ${pos}`);
      setComplexityInfo('Time: O(n) | Space: O(1)');
      clearHighlights();
    }, 1000);
  };

  // Search - O(n)
  const searchNode = (value) => {
    if (!value) return;
    let foundIndices = [];
    nodes.forEach((node, index) => {
      if (node === value) foundIndices.push(index);
    });
    setHighlightedNodes(foundIndices);
    setMessage(foundIndices.length > 0 ? `Found at position(s): ${foundIndices.join(', ')}` : 'Not found');
    setComplexityInfo('Time: O(n) | Space: O(1)');
    setTimeout(clearHighlights, 2000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Singly Linked List Operations</h2>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter value"
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Position (optional)"
              className="border p-2 rounded w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => insertAtHead(newValue)}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <Plus size={16} /> Add Head
            </button>
            <button
              onClick={() => insertAtTail(newValue)}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              <Plus size={16} /> Add Tail
            </button>
            <button
              onClick={() => position !== '' && insertAtPosition(newValue, parseInt(position))}
              className="flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              <Edit size={16} /> Insert At Position
            </button>
            <button
              onClick={() => searchNode(newValue)}
              className="flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              <Search size={16} /> Search
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
          <button
            onClick={deleteFromHead}
            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <Trash size={16} /> Delete Head
          </button>
          <button
            onClick={deleteFromTail}
            className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            <Trash size={16} /> Delete Tail
          </button>
          <button
            onClick={() => position !== '' && deleteAtPosition(parseInt(position))}
            className="flex items-center justify-center gap-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            <Trash size={16} /> Delete At Position
          </button>
        </div>

        {/* Linked List Visualization */}
        <div className="overflow-x-auto mb-6">
          <div className="flex items-center min-w-max p-4">
            {nodes.length === 0 ? (
              <div className="text-gray-500">Empty List</div>
            ) : (
              nodes.map((value, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div 
                      className={`border-2 ${
                        highlightedNodes.includes(index)
                          ? 'border-yellow-500 bg-yellow-100'
                          : 'border-blue-500'
                      } rounded p-3 w-20 text-center`}
                    >
                      {value}
                    </div>
                    {index === 0 && (
                      <div className="text-xs mt-1 text-gray-500">Head</div>
                    )}
                    {index === nodes.length - 1 && (
                      <div className="text-xs mt-1 text-gray-500">Tail</div>
                    )}
                  </div>
                  {index < nodes.length - 1 && (
                    <ArrowRight className="mx-2 text-blue-500" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Operation Info */}
        {message && (
          <div className="mb-2 p-2 bg-blue-100 rounded">
            {message}
          </div>
        )}
        {complexityInfo && (
          <div className="p-2 bg-yellow-100 rounded">
            {complexityInfo}
          </div>
        )}

        {/* Time & Space Complexity Table */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-2">Operation Complexities</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Operation</th>
                  <th className="border p-2 text-left">Time Complexity</th>
                  <th className="border p-2 text-left">Space Complexity</th>
                  <th className="border p-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Insert at Head</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">Constant time operation</td>
                </tr>
                <tr>
                  <td className="border p-2">Insert at Tail</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">With tail pointer</td>
                </tr>
                <tr>
                  <td className="border p-2">Insert at Position</td>
                  <td className="border p-2">O(n)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">Requires traversal to position</td>
                </tr>
                <tr>
                  <td className="border p-2">Delete from Head</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">Constant time operation</td>
                </tr>
                <tr>
                  <td className="border p-2">Delete from Tail</td>
                  <td className="border p-2">O(n)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">Requires traversal to find second-last node</td>
                </tr>
                <tr>
                  <td className="border p-2">Delete at Position</td>
                  <td className="border p-2">O(n)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">Requires traversal to position</td>
                </tr>
                <tr>
                  <td className="border p-2">Search</td>
                  <td className="border p-2">O(n)</td>
                  <td className="border p-2">O(1)</td>
                  <td className="border p-2">May require full traversal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;