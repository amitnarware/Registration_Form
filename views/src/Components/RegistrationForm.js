import React, { useState } from 'react';
import '../css/RegistrationForm.css'; 
import { useHistory } from 'react-router-dom';



// Import CSS file for styling

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', gender: '',email: '',password: '',confirmPassword: '',city: '',
        state: '',zip: '', country: '', areaOfInterest: [],
 profilePicture: null,
    });

    const indiaStates = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
        'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
        'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    ];

    const usaStates = [
        'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
        'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
        'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    ];

    const indiaCities = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
        'Arunachal Pradesh': ['Itanagar', 'Naharlagun'],
        'Assam': ['Guwahati', 'Dibrugarh', 'Silchar'],
        'Bihar': ['Patna', 'Gaya', 'Bhagalpur'],
        'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur'],
        'Goa': ['Panaji', 'Margao', 'Vasco da Gama'],
        'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
        'Haryana': ['Chandigarh', 'Faridabad', 'Gurugram'],
        'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Kullu'],
        'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad'],
        'Karnataka': ['Bengaluru', 'Mysuru', 'Hubballi'],
        'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
        'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
        'Manipur': ['Imphal'],
        'Meghalaya': ['Shillong'],
        'Mizoram': ['Aizawl'],
        'Nagaland': ['Kohima', 'Dimapur'],
        'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela'],
        'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
        'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
        'Sikkim': ['Gangtok'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
        'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar'],
        'Tripura': ['Agartala'],
        'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
        'Uttarakhand': ['Dehradun', 'Haridwar', 'Rishikesh'],
        'West Bengal': ['Kolkata', 'Asansol', 'Siliguri'],
    };
    

    const usaCities = {
        Alabama: ['Birmingham', 'Montgomery', 'Huntsville'],
        Alaska: ['Anchorage', 'Fairbanks', 'Juneau'],
        // Add more states and cities as needed
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
      });
    };
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);


        if (!formData.profilePicture) {
            alert('Profile picture is required');
            setLoading(false);
            return;
        }
        // Implement form validation
        if (
            !formData.firstName || !formData.lastName || !formData.gender || !formData.email ||
            !formData.password || !formData.confirmPassword || !formData.city || !formData.state ||
            !formData.zip || !formData.country || !formData.areaOfInterest || !formData.profilePicture 
          ) 
        
        // Implement password and confirm password match validation
 
        
        try {
            const formDataWithFile = new FormData();
            Object.keys(formData).forEach((key) => {
                formDataWithFile.append(key, formData[key]);
            });

            const response = await fetch('http://localhost:3002/auth/register', {
                method: 'POST',
                body: formDataWithFile,
            });
            const data = await response.json();
            console.log(data); // Assuming the backend returns a success message
            setTimeout(() => {
                setLoading(false);
                alert('Registration successful');
                history.push('/login'); // Redirect to login page
                setFormData({
                    firstName: '', lastName: '', gender: '', email: '', password: '', confirmPassword: '', city: '',
                    state: '', zip: '', country: '', areaOfInterest: [], profilePicture: null,
                });
            }, 2000);
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user. Please try again later.');
            setLoading(false);
        }
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                autoComplete="given-name"
                required
            />
            <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                autoComplete="family-name" 
                required
            />
            <label>
                Gender:
                <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleInputChange}
                /> Male
                <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleInputChange}
                /> Female
            </label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                required
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                autoComplete="new-password" 
                required
            />

            <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
            </select>
            <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
            >
                <option value="">Select State</option>
                {formData.country === 'India'
                    ? indiaStates.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))
                    : usaStates.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
            </select>
            <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
            >
                <option value="">Select City</option>
                {formData.country === 'India' && formData.state && indiaCities[formData.state] && indiaCities[formData.state].map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
                {formData.country === 'USA' && formData.state && usaCities[formData.state] && usaCities[formData.state].map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <input
                type="text"
                name="zip"
                placeholder="Zip"
                value={formData.zip}
                onChange={handleInputChange}
            />
                 
                        {/* Add options dynamically based on selected state */}
                  
                        <div className="areaOfInterest">
                <label>
                    <input
                        type="checkbox"
                        name="areaOfInterest"
                        value="reading"
                        checked={formData.areaOfInterest.includes('reading')}
                        onChange={handleInputChange}
                        /> Reading
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="areaOfInterest"
                            value="writing"
                            checked={formData.areaOfInterest.includes('writing')}
                            onChange={handleInputChange}
                        /> Writing
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="areaOfInterest"
                            value="traveling"
                            checked={formData.areaOfInterest.includes('traveling')}
                            onChange={handleInputChange}
                        /> Traveling
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="areaOfInterest"
                            value="playing"
                            checked={formData.areaOfInterest.includes('playing')}
                            onChange={handleInputChange}
                        /> Playing
                    </label>
                </div>
                <input
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                />
               <button type="submit" disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>   
        );
    };
    
    export default RegistrationForm;


