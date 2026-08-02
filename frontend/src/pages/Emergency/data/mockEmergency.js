export const mockEmergencyRequests = [
  {
    id: 1,
    type: "Blood Request",
    typeIcon: "🩸",
    urgency: "Critical",
    urgencyColor: "red",
    title: "Urgent: O+ Blood Required",
    description: "Patient at Lilavati Hospital needs O+ blood immediately. Surgery in 4 hours.",
    location: "Lilavati Hospital, Bandra, Mumbai",
    time: "Posted 10 min ago",
    activeRequests: 8,
    contact: "+91 98765 43210",
    contactPerson: "Dr. Sharma",
    status: "active",
    tags: ["O+ Blood", "Emergency", "Surgery"],
    responses: 5,
    shares: 12,
    isUrgent: true
  },
  {
    id: 2,
    type: "Medical Help",
    typeIcon: "🏥",
    urgency: "High",
    urgencyColor: "orange",
    title: "Medical Professional Needed",
    description: "Senior citizen requires medical assistance at home. Not ambulatory. Need immediate medical checkup.",
    location: "Koramangala, Bengaluru",
    time: "Posted 45 min ago",
    activeRequests: 3,
    contact: "+91 87654 32109",
    contactPerson: "Mr. Patel",
    status: "active",
    tags: ["Medical", "Home Care", "Elderly"],
    responses: 2,
    shares: 8,
    isUrgent: true
  },
  {
    id: 3,
    type: "Volunteer",
    typeIcon: "🤝",
    urgency: "Medium",
    urgencyColor: "yellow",
    title: "Flood Relief Volunteers Needed",
    description: "10 volunteers needed for rescue and relief operations in Kurla area. Immediate assistance required.",
    location: "Kurla, Mumbai",
    time: "Posted 15 min ago",
    activeRequests: 5,
    contact: "+91 76543 21098",
    contactPerson: "NGO Coordinator",
    status: "active",
    tags: ["Volunteer", "Relief", "Flood"],
    responses: 8,
    shares: 24,
    isUrgent: true
  },
  {
    id: 4,
    type: "Blood Request",
    typeIcon: "🩸",
    urgency: "Critical",
    urgencyColor: "red",
    title: "A- Blood Needed",
    description: "Patient at AIIMS requires A- blood for emergency surgery. Donors needed immediately.",
    location: "AIIMS, Delhi",
    time: "Posted 1 hour ago",
    activeRequests: 8,
    contact: "+91 65432 10987",
    contactPerson: "Dr. Gupta",
    status: "active",
    tags: ["A- Blood", "Emergency", "Surgery"],
    responses: 3,
    shares: 18,
    isUrgent: true
  },
  {
    id: 5,
    type: "Medical Help",
    typeIcon: "🏥",
    urgency: "High",
    urgencyColor: "orange",
    title: "Emergency Ambulance Needed",
    description: "Patient in critical condition needs immediate ambulance transport to nearest hospital.",
    location: "Andheri, Mumbai",
    time: "Posted 32 min ago",
    activeRequests: 3,
    contact: "+91 54321 09876",
    contactPerson: "Family Member",
    status: "active",
    tags: ["Ambulance", "Critical", "Transport"],
    responses: 1,
    shares: 6,
    isUrgent: true
  },
  {
    id: 6,
    type: "Volunteer",
    typeIcon: "🤝",
    urgency: "Medium",
    urgencyColor: "yellow",
    title: "Food Distribution Help",
    description: "Need volunteers to help distribute food packets to homeless shelters in the city.",
    location: "Bandra, Mumbai",
    time: "Posted 2 hours ago",
    activeRequests: 5,
    contact: "+91 43210 98765",
    contactPerson: "Community Organizer",
    status: "active",
    tags: ["Food", "Distribution", "Volunteer"],
    responses: 6,
    shares: 15,
    isUrgent: false
  },
  {
    id: 7,
    type: "Blood Request",
    typeIcon: "🩸",
    urgency: "High",
    urgencyColor: "orange",
    title: "B+ Blood Required",
    description: "Patient undergoing surgery needs B+ blood. Any eligible donors please contact.",
    location: "Nanavati Hospital, Mumbai",
    time: "Posted 3 hours ago",
    activeRequests: 8,
    contact: "+91 32109 87654",
    contactPerson: "Nurse Station",
    status: "active",
    tags: ["B+ Blood", "Surgery", "Hospital"],
    responses: 4,
    shares: 10,
    isUrgent: false
  },
  {
    id: 8,
    type: "Volunteer",
    typeIcon: "🤝",
    urgency: "Low",
    urgencyColor: "green",
    title: "Animal Rescue Help",
    description: "Need volunteers for animal rescue and shelter operations. No experience required.",
    location: "Churchgate, Mumbai",
    time: "Posted 5 hours ago",
    activeRequests: 5,
    contact: "+91 21098 76543",
    contactPerson: "Animal Welfare Society",
    status: "active",
    tags: ["Animals", "Rescue", "Shelter"],
    responses: 12,
    shares: 28,
    isUrgent: false
  }
];

// Emergency types for stats
export const emergencyTypes = [
  { id: 'blood', label: 'Blood Request', icon: '🩸', color: 'red' },
  { id: 'medical', label: 'Medical Help', icon: '🏥', color: 'orange' },
  { id: 'volunteer', label: 'Volunteer', icon: '🤝', color: 'blue' }
];

// Get counts by type
export const getEmergencyCounts = () => {
  const counts = {
    blood: 0,
    medical: 0,
    volunteer: 0
  };
  
  mockEmergencyRequests.forEach(req => {
    if (req.type === 'Blood Request') counts.blood++;
    else if (req.type === 'Medical Help') counts.medical++;
    else if (req.type === 'Volunteer') counts.volunteer++;
  });
  
  return counts;
};