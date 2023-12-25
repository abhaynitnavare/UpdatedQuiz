import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditPage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: '',
    explanation: '',
    hint: '',
    options: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/Editquestion/${id}`);
        const data = await response.json();
        console.log(data, "data to edit");
        setFormData(data); // Set the retrieved data to formData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/Edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the updated form data to the backend
      });

      console.log(response,"response of edit ")
    };

  return (
    <>
      <h4>Edit Question</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input type="text" name="question" value={formData.question} onChange={handleInputChange} />
        </div>
        <div>
          <label>Explanation:</label>
          <textarea name="explanation" value={formData.explanation} onChange={handleInputChange} />
        </div>
        <div>
          <label>Hint:</label>
          <input type="text" name="hint" value={formData.hint} onChange={handleInputChange} />
        </div>
        <div>
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                name={`option-${index}`}
                value={option.option}
                onChange={(e) => {
                  const updatedOptions = [...formData.options];
                  updatedOptions[index] = { ...updatedOptions[index], option: e.target.value };
                  setFormData({ ...formData, options: updatedOptions });
                }}
              />
              {/* Add additional fields for other properties of options if needed */}
            </div>
          ))}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </>
  );
};

export default EditPage;
