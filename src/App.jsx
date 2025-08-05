import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Textarea } from './components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Calendar, Clock, User, Heart, MessageCircle, FileText, Settings, LogOut, UserPlus, CheckCircle, X } from 'lucide-react';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState('patient');
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    specialization: '',
    experience: ''
  });

  // Sample data with Indian names
  const [doctors] = useState([
    { id: 1, name: 'Dr. Saif Ahmed', specialization: 'Cardiology', experience: '8 years', available: true, rating: 4.8 },
    { id: 2, name: 'Dr. Taha Khan', specialization: 'Dermatology', experience: '6 years', available: true, rating: 4.7 },
    { id: 3, name: 'Dr. Suhaib Rahman', specialization: 'Pediatrics', experience: '10 years', available: false, rating: 4.9 },
    { id: 4, name: 'Dr. Arjun Patel', specialization: 'Orthopedics', experience: '12 years', available: true, rating: 4.6 },
    { id: 5, name: 'Dr. Priya Sharma', specialization: 'Gynecology', experience: '9 years', available: true, rating: 4.8 }
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: 'Vamshi Krishna', age: 28, phone: '+91 9876543210', email: 'vamshi@email.com', lastVisit: '2024-01-10' },
    { id: 2, name: 'Faiz Ullah', age: 35, phone: '+91 9876543211', email: 'faiz@email.com', lastVisit: '2024-01-08' },
    { id: 3, name: 'Kiran Kumar', age: 42, phone: '+91 9876543212', email: 'kiran@email.com', lastVisit: '2024-01-05' },
    { id: 4, name: 'Aisha Begum', age: 29, phone: '+91 9876543213', email: 'aisha@email.com', lastVisit: '2024-01-12' },
    { id: 5, name: 'Rajesh Reddy', age: 38, phone: '+91 9876543214', email: 'rajesh@email.com', lastVisit: '2024-01-15' }
  ]);

  const [appointments, setAppointments] = useState([
    { id: 1, patientName: 'Vamshi Krishna', doctorName: 'Dr. Saif Ahmed', date: '2024-01-15', time: '10:00 AM', type: 'Consultation', status: 'confirmed', problem: 'Chest pain and shortness of breath' },
    { id: 2, patientName: 'Faiz Ullah', doctorName: 'Dr. Taha Khan', date: '2024-01-18', time: '2:30 PM', type: 'Follow-up', status: 'pending', problem: 'Skin rash on arms and face' },
    { id: 3, patientName: 'Kiran Kumar', doctorName: 'Dr. Arjun Patel', date: '2024-01-20', time: '11:15 AM', type: 'Check-up', status: 'completed', problem: 'Lower back pain for 2 weeks' },
    { id: 4, patientName: 'Aisha Begum', doctorName: 'Dr. Priya Sharma', date: '2024-01-22', time: '3:00 PM', type: 'Consultation', status: 'confirmed', problem: 'Irregular menstrual cycle' },
    { id: 5, patientName: 'Rajesh Reddy', doctorName: 'Dr. Saif Ahmed', date: '2024-01-25', time: '9:30 AM', type: 'Emergency', status: 'pending', problem: 'Severe headache and dizziness' }
  ]);

  const [messages, setMessages] = useState([
    { id: 1, from: 'Dr. Saif Ahmed', to: 'Vamshi Krishna', message: 'Your test results are normal. Continue with current medication.', timestamp: '2 hours ago', read: true },
    { id: 2, from: 'Faiz Ullah', to: 'Dr. Taha Khan', message: 'The rash is getting better with the prescribed cream. Should I continue?', timestamp: '1 day ago', read: false },
    { id: 3, from: 'Dr. Arjun Patel', to: 'Kiran Kumar', message: 'Please schedule a follow-up appointment in 2 weeks.', timestamp: '3 days ago', read: true }
  ]);

  const [prescriptions] = useState([
    { id: 1, patientName: 'Vamshi Krishna', doctorName: 'Dr. Saif Ahmed', medication: 'Lisinopril 10mg', dosage: 'Once daily', date: '2024-01-10', notes: 'Take with food' },
    { id: 2, patientName: 'Faiz Ullah', doctorName: 'Dr. Taha Khan', medication: 'Hydrocortisone Cream', dosage: 'Apply twice daily', date: '2024-01-08', notes: 'Apply to affected areas only' },
    { id: 3, patientName: 'Kiran Kumar', doctorName: 'Dr. Arjun Patel', medication: 'Ibuprofen 400mg', dosage: 'As needed for pain', date: '2024-01-05', notes: 'Do not exceed 3 times daily' }
  ]);

  const [doctorAvailability, setDoctorAvailability] = useState({
    1: { days: ['Monday', 'Tuesday', 'Wednesday', 'Friday'], startTime: '09:00', endTime: '17:00' },
    2: { days: ['Monday', 'Wednesday', 'Thursday', 'Saturday'], startTime: '10:00', endTime: '18:00' },
    3: { days: ['Tuesday', 'Thursday', 'Friday'], startTime: '08:00', endTime: '16:00' },
    4: { days: ['Monday', 'Tuesday', 'Friday', 'Saturday'], startTime: '09:30', endTime: '17:30' },
    5: { days: ['Wednesday', 'Thursday', 'Friday', 'Saturday'], startTime: '10:00', endTime: '18:00' }
  });

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    medicalHistory: ''
  });

  const [newMessage, setNewMessage] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: '',
    date: '',
    time: '',
    type: 'Consultation',
    problem: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    const userData = {
      id: userType === 'patient' ? 1 : 1,
      name: userType === 'patient' ? 'Vamshi Krishna' : 'Dr. Saif Ahmed',
      email: formData.email,
      type: userType
    };
    setCurrentUser(userData);
    setFormData({ email: '', password: '', name: '', phone: '', specialization: '', experience: '' });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate sign up
    const userData = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      type: userType,
      ...(userType === 'doctor' && { specialization: formData.specialization, experience: formData.experience })
    };
    setCurrentUser(userData);
    setFormData({ email: '', password: '', name: '', phone: '', specialization: '', experience: '' });
    setIsSignUp(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUserType('patient');
    setIsSignUp(false);
  };

  const addNewPatient = (e) => {
    e.preventDefault();
    const patient = {
      id: Date.now(),
      ...newPatient,
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, patient]);
    setNewPatient({ name: '', age: '', phone: '', email: '', address: '', medicalHistory: '' });
  };

  const bookAppointment = (e) => {
    e.preventDefault();
    const doctor = doctors.find(d => d.id === parseInt(appointmentForm.doctorId));
    const appointment = {
      id: Date.now(),
      patientName: currentUser.name,
      doctorName: doctor.name,
      date: appointmentForm.date,
      time: appointmentForm.time,
      type: appointmentForm.type,
      status: 'pending',
      problem: appointmentForm.problem
    };
    setAppointments([...appointments, appointment]);
    setAppointmentForm({ doctorId: '', date: '', time: '', type: 'Consultation', problem: '' });
  };

  const markAppointmentCompleted = (appointmentId) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: 'completed' } : apt
    ));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && selectedDoctor) {
      const message = {
        id: Date.now(),
        from: currentUser.name,
        to: selectedDoctor,
        message: newMessage,
        timestamp: 'Just now',
        read: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const updateAvailability = (doctorId, availability) => {
    setDoctorAvailability({
      ...doctorAvailability,
      [doctorId]: availability
    });
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">HealthTrack</h1>
            </div>
            <CardTitle>{isSignUp ? 'Create Account' : 'Welcome Back'}</CardTitle>
            <CardDescription>
              {isSignUp ? 'Sign up to your account' : 'Sign in to your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={userType} onValueChange={setUserType} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="patient">Patient</TabsTrigger>
                <TabsTrigger value="doctor">Doctor</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>

              {isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  {userType === 'doctor' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          placeholder="Enter your specialization"
                          value={formData.specialization}
                          onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience</Label>
                        <Input
                          id="experience"
                          placeholder="Years of experience"
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                          required
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              <Button type="submit" className="w-full">
                {isSignUp ? 'Sign Up' : `Sign In as ${userType === 'patient' ? 'Patient' : 'Doctor'}`}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (currentUser.type === 'patient') {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-blue-600 mr-2" />
                <h1 className="text-2xl font-bold text-gray-900">HealthTrack</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Tabs defaultValue="book" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="book">Book Appointment</TabsTrigger>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="chat">Chat with Doctors</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="book" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book Appointment
                  </CardTitle>
                  <CardDescription>Schedule a new appointment with a doctor</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={bookAppointment} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Select Doctor</Label>
                        <Select value={appointmentForm.doctorId} onValueChange={(value) => setAppointmentForm({...appointmentForm, doctorId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.filter(d => d.available).map(doctor => (
                              <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                {doctor.name} - {doctor.specialization}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">Appointment Type</Label>
                        <Select value={appointmentForm.type} onValueChange={(value) => setAppointmentForm({...appointmentForm, type: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Consultation">Consultation</SelectItem>
                            <SelectItem value="Follow-up">Follow-up</SelectItem>
                            <SelectItem value="Check-up">Check-up</SelectItem>
                            <SelectItem value="Emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={appointmentForm.date}
                          onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time">Time</Label>
                        <Select value={appointmentForm.time} onValueChange={(value) => setAppointmentForm({...appointmentForm, time: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                            <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                            <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                            <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                            <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                            <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="problem">Describe your problem</Label>
                      <Textarea
                        id="problem"
                        placeholder="Please describe your symptoms or health concern..."
                        value={appointmentForm.problem}
                        onChange={(e) => setAppointmentForm({...appointmentForm, problem: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">Book Appointment</Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Available Doctors</CardTitle>
                  <CardDescription>View available doctors and their specializations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map(doctor => (
                      <Card key={doctor.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <Badge variant={doctor.available ? "default" : "secondary"}>
                            {doctor.available ? "Available" : "Busy"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{doctor.specialization}</p>
                        <p className="text-sm text-gray-500">{doctor.experience}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-yellow-600">★ {doctor.rating}</span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    My Appointments
                  </CardTitle>
                  <CardDescription>View and manage your appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {appointments.filter(apt => apt.patientName === currentUser.name).map(appointment => (
                      <Card key={appointment.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{appointment.doctorName}</h3>
                            <p className="text-sm text-gray-600">{appointment.type}</p>
                            <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                            <p className="text-sm text-gray-700 mt-1">Problem: {appointment.problem}</p>
                          </div>
                          <Badge variant={
                            appointment.status === 'confirmed' ? 'default' :
                            appointment.status === 'completed' ? 'secondary' : 'outline'
                          }>
                            {appointment.status}
                          </Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chat" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Chat with Doctors
                  </CardTitle>
                  <CardDescription>Send messages to your healthcare providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {messages.filter(msg => msg.to === currentUser.name || msg.from === currentUser.name).map(message => (
                        <div key={message.id} className={`p-3 rounded-lg ${message.from === currentUser.name ? 'bg-blue-100 ml-8' : 'bg-gray-100 mr-8'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{message.from}</span>
                            <span className="text-xs text-gray-500">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={sendMessage} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="doctor-select">Send to Doctor</Label>
                        <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {doctors.map(doctor => (
                              <SelectItem key={doctor.id} value={doctor.name}>
                                {doctor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex space-x-2">
                        <Textarea
                          placeholder="Type your message here..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit">Send</Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Prescriptions
                  </CardTitle>
                  <CardDescription>View and download your prescriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prescriptions.filter(p => p.patientName === currentUser.name).map(prescription => (
                      <Card key={prescription.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{prescription.medication}</h3>
                            <p className="text-sm text-gray-600">Prescribed by {prescription.doctorName}</p>
                            <p className="text-sm text-gray-500">Dosage: {prescription.dosage}</p>
                            <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                            {prescription.notes && (
                              <p className="text-sm text-gray-700 mt-1">Notes: {prescription.notes}</p>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
          Made by SAIF TAHA
        </footer>
      </div>
    );
  }

  // Doctor Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">HealthTrack</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="availability">Manage Availability</TabsTrigger>
            <TabsTrigger value="messages">Patient Messages</TabsTrigger>
            <TabsTrigger value="stats">Quick Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Today's Appointments
                </CardTitle>
                <CardDescription>View and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.filter(apt => apt.doctorName === currentUser.name).map(appointment => (
                    <Card key={appointment.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{appointment.patientName}</h3>
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                          <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                          <p className="text-sm text-gray-700 mt-1">
                            <strong>Problem:</strong> {appointment.problem}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            appointment.status === 'confirmed' ? 'default' :
                            appointment.status === 'completed' ? 'secondary' : 'outline'
                          }>
                            {appointment.status}
                          </Badge>
                          {appointment.status !== 'completed' && (
                            <Button 
                              size="sm" 
                              onClick={() => markAppointmentCompleted(appointment.id)}
                              className="ml-2"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Add New Patient
                </CardTitle>
                <CardDescription>Register a new patient in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addNewPatient} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patient-name">Full Name</Label>
                      <Input
                        id="patient-name"
                        placeholder="Enter patient name"
                        value={newPatient.name}
                        onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-age">Age</Label>
                      <Input
                        id="patient-age"
                        type="number"
                        placeholder="Enter age"
                        value={newPatient.age}
                        onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-phone">Phone</Label>
                      <Input
                        id="patient-phone"
                        placeholder="Enter phone number"
                        value={newPatient.phone}
                        onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patient-email">Email</Label>
                      <Input
                        id="patient-email"
                        type="email"
                        placeholder="Enter email"
                        value={newPatient.email}
                        onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-address">Address</Label>
                    <Input
                      id="patient-address"
                      placeholder="Enter address"
                      value={newPatient.address}
                      onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medical-history">Medical History</Label>
                    <Textarea
                      id="medical-history"
                      placeholder="Enter medical history..."
                      value={newPatient.medicalHistory}
                      onChange={(e) => setNewPatient({...newPatient, medicalHistory: e.target.value})}
                    />
                  </div>
                  <Button type="submit" className="w-full">Add Patient</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Registered Patients</CardTitle>
                <CardDescription>View all registered patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patients.map(patient => (
                    <Card key={patient.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-gray-600">Age: {patient.age}</p>
                          <p className="text-sm text-gray-500">{patient.phone}</p>
                          <p className="text-sm text-gray-500">{patient.email}</p>
                          <p className="text-sm text-gray-500">Last visit: {patient.lastVisit}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Manage Availability
                </CardTitle>
                <CardDescription>Set your availability status and working hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Current Status</h3>
                    <div className="flex items-center space-x-4">
                      <Badge variant="default">Available</Badge>
                      <Button variant="outline" size="sm">
                        Change Status
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Working Days</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                        <div key={day} className="flex items-center space-x-2">
                          <input type="checkbox" id={day} defaultChecked={doctorAvailability[1]?.days.includes(day)} />
                          <label htmlFor={day} className="text-sm">{day}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input
                        id="start-time"
                        type="time"
                        defaultValue="09:00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input
                        id="end-time"
                        type="time"
                        defaultValue="17:00"
                      />
                    </div>
                  </div>

                  <Button className="w-full">Update Availability</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Patient Messages
                </CardTitle>
                <CardDescription>Respond to patient inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.filter(msg => msg.to === currentUser.name || msg.from === currentUser.name).map(message => (
                    <Card key={message.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{message.from === currentUser.name ? `To: ${message.to}` : `From: ${message.from}`}</h3>
                          <p className="text-sm text-gray-500">{message.timestamp}</p>
                        </div>
                        {!message.read && message.to === currentUser.name && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{message.message}</p>
                      {message.to === currentUser.name && (
                        <Button size="sm" variant="outline">
                          Reply
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Messages</CardTitle>
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Require response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Week</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">Total appointments</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">Registered patients</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <footer className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        Made by SAIF TAHA
      </footer>
    </div>
  );
}

export default App;

