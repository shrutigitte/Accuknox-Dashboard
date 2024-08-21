import React, { useState } from 'react';
import DonutChart from './DonutChart'; //importing DonutCHart component
import PieChart from './PieChart'; //Imoorting PieChart COmponent
import BarGraph from './BarGraph'; //Importing the BarGraph Component
import Modal from './Modal'; // Importing the Modal component
import { MdAutoGraph } from "react-icons/md"; // Importing the icon

function Dashboard() {
  const [donutWidgets, setDonutWidgets] = useState([
    { data: [50, 50], labels: ['Connected', 'Not Connected'], title: 'Cloud Accounts' },
    { data: [74, 4, 8, 14], labels: ['Passed', 'Not Available', 'Warning', 'Failed'], title: 'Cloud Account Risk Assessment' },
  ]);
  const [pieWidgets, setPieWidgets] = useState([
    {data:[],labels:[],title:'Top 5 namespace Specific Alerts'},{data:[],labels:[],title:'Workload Alerts'}
]); // Starting with no pie data labels as shown in the reference photo
  const [barWidgets, setBarWidgets] = useState([
        { data: [100, 200, 300], labels: ['Critical', 'High', 'Medium'], title: 'Image Risk Assessment' },
        { data: [150, 250], labels: ['Low', 'Medium'], title: 'Image Security Issues' },
      ]);

  const [showInputForm, setShowInputForm] = useState(false);
  const [newData, setNewData] = useState('');
  const [newLabels, setNewLabels] = useState('');
  const [title, setTitle] = useState('');
  const [currentType, setCurrentType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const addWidget = () => {
    const data = newData.split(',').map(Number);
    const labels = newLabels.split(',').map(label => label.trim());

    // Validating input
    if (data.length !== labels.length || !labels.length) {
      alert('Please ensure the number of labels matches the number of data points.');
      return;
    }

    const newWidget = { data, labels, title };

    // Adding to the appropriate widget type
    if (currentType === 'donut') {
      setDonutWidgets([...donutWidgets, newWidget]);
    } else if (currentType === 'pie') {
      setPieWidgets([...pieWidgets, newWidget]);
    } else if (currentType === 'bar') {
      setBarWidgets([...barWidgets, newWidget]);
    }

    // Resetting form fields
    setShowInputForm(false);
    setNewData('');
    setNewLabels('');
    setTitle('');
  };

  const removeWidget = (type, index) => {
    if (type === 'donut') {
      setDonutWidgets(donutWidgets.filter((_, i) => i !== index));
    } else if (type === 'pie') {
      setPieWidgets(pieWidgets.filter((_, i) => i !== index));
    } else if (type === 'bar') {
      setBarWidgets(barWidgets.filter((_, i) => i !== index));
    }
  };

  const showForm = (type) => {
    setCurrentType(type);
    setShowInputForm(true);
    // Resetting form fields when opening the modal
    setNewData('');
    setNewLabels('');
    setTitle('');
  };

  // Filtering widgets based on search query entered in Search input
  const filterWidgets = (widgets) => {
    return widgets.filter(widget => widget.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };


  return (
    <div className="p-4">
      {/* Search Input Text */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search Widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-1/4"
        />
      </div>


      <div className='bg-gray-100 p-2'>
        
      <h3 className='font-bold text-2xl'>CSPM Dashboard:</h3>
      {/* Donut Chart Row */}
       <div className="flex flex-wrap mb-4">
         {filterWidgets(donutWidgets).length > 0 ? (
          filterWidgets(donutWidgets).map((widget, index) => (
            <div key={index} className="relative hover:scale-105 bg-white p-4 shadow rounded-md flex-1 m-2 w-1/5">
              <button
                onClick={() => removeWidget('donut', index)}
                className="absolute top-2 right-2 text-red-500"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold text-center">{widget.title}</h3>
              {widget.data.length > 0 && widget.labels.length > 0 ? (
              <DonutChart data={widget.data} labels={widget.labels} />
            ) : (
              <div className="flex items-center justify-center h-32">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            )}
          </div>
          ))
        ) : (
          <>
            {/* Two No Graph Available Widgets if there are 0 widgets */}
            <div className="relative bg-white p-4 h-64 shadow rounded-md flex-1 m-2 w-1/5">
              <div className="flex items-center justify-center h-full">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            </div>
            <div className="relative bg-white p-4 h-64 shadow rounded-md flex-1 m-2 w-1/5">
              <div className="flex items-center justify-center h-full">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => showForm('donut')}
          className="bg-blue-500 text-white hover:scale-105 hover:bg-teal-500 p-4 shadow rounded-md flex-1 m-2 w-1/5"
        >
          Add Widget
        </button>
      </div>
      {/* Pie Chart Row */}
      <h3 className='font-bold text-2xl'>CWPP Dashboard:</h3>
      <div className="flex flex-wrap mb-4">
        {filterWidgets(pieWidgets).length > 0 ? (
          filterWidgets(pieWidgets).map((widget, index) => (
            <div key={index} className="relative bg-white hover:scale-105 p-4 shadow rounded-md flex-1 m-2 w-1/5">
              <button
                onClick={() => removeWidget('pie', index)}
                className="absolute top-2 right-2 text-red-500"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold text-center">{widget.title}</h3>
              {widget.data.length > 0 && widget.labels.length > 0 ? (
              <PieChart data={widget.data} labels={widget.labels} />
            ) : (
              <div className="flex items-center justify-center h-32">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            )}
            </div>
          ))
        ) : (
          <>
            {/* Two No Graph Available Widgets if there are 0 widgets */}
            <div className="relative bg-white p-4 h-64 shadow rounded-md flex-1 m-2 w-1/5">
              <div className="flex items-center justify-center h-full">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            </div>
            <div className="relative bg-white p-4 h-64 shadow rounded-md flex-1 m-2 w-1/5">
              <div className="flex items-center justify-center h-full">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            </div>
          </>
        )}
        <button
          onClick={() => showForm('pie')}
          className="bg-blue-500 hover:scale-105 hover:bg-teal-500 text-white p-4 shadow rounded-md flex-1 m-2 w-1/5"
        >
          Add Widget
        </button>
      </div>

      {/* Bar Graph Row */}
      <h3 className='font-bold text-2xl'>Registry Scan:</h3>
      <div className="flex flex-wrap mb-4">
        {filterWidgets(barWidgets).map((widget, index) => (
          <div key={index} className="relative hover:scale-105 bg-white p-4 shadow rounded-md flex-1 m-2 w-1/5">
            <button
              onClick={() => removeWidget('bar', index)}
              className="absolute top-2 right-2 text-red-500"
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold text-center">{widget.title}</h3>
            {widget.data.length > 0 && widget.labels.length > 0 ? (
              <BarGraph data={widget.data} labels={widget.labels} />
            ) : (
              <div className="flex items-center justify-center h-32">
                <MdAutoGraph className="text-gray-400 text-6xl" />
                <p className="text-gray-600 text-lg ml-4">No Graph Available</p>
              </div>
            )}
          </div>
        ))}
        {barWidgets.length < 5 && (
          <button
            onClick={() => showForm('bar')}
            className="bg-blue-500 hover:scale-105 hover:bg-teal-500  text-white p-4 shadow rounded-md flex-1 m-2 w-1/5"
          >
            Add Widget
          </button>
        )}
      </div>
      </div>

      {/* Widget Input Form as a Modal on the right hand side of the screen */}
      <Modal isOpen={showInputForm} onClose={() => setShowInputForm(false)}>
        <h3 className="text-lg font-semibold">Enter Widget Data</h3>
        <input
          type="text"
          placeholder="Enter Widget Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Enter Data (comma separated)"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Enter Labels (comma separated)"
          value={newLabels}
          onChange={(e) => setNewLabels(e.target.value)}
          className="border rounded p-2 w-full mb-2"
        />
        <button
          onClick={addWidget}
          className="bg-green-500 text-white p-2 rounded-md w-full mt-2"
        >
          Add Widget
        </button>
      </Modal>
    </div>
  );
}

export default Dashboard;