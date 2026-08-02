import { useState, useEffect } from 'react';
import { Home, Calendar, User, Clock, Users, Wifi, Bell, ArrowLeft, ChevronLeft, ChevronRight, Monitor, Check, SlidersHorizontal, PenTool, Phone, Thermometer, Share2, Search as SearchIcon, MapPin, Coffee, Link2, ExternalLink, Plus, Trash2, Heart, LayoutGrid, BookOpen, Presentation, LogOut, ChevronRight as ChevronRightIcon, Edit3, Shield, HelpCircle, Camera, VolumeX, Activity, X, QrCode, Navigation, Copy, Sparkles, Key } from 'lucide-react';

const getAsset = (path: string) => {
  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\//, '');
  return base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showQrAccessModal, setShowQrAccessModal] = useState(false);
  
  // Countdown Timer for Active Reminders & Reservation Super Page
  const [countdownSeconds, setCountdownSeconds] = useState(4820);
  useEffect(() => {
    const timer = setInterval(() => setCountdownSeconds(prev => (prev > 0 ? prev - 1 : 7200)), 1000);
    return () => clearInterval(timer);
  }, []);

  const getCountdownParts = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return {
      h: h.toString().padStart(2, '0'),
      m: m.toString().padStart(2, '0'),
      s: s.toString().padStart(2, '0')
    };
  };

  // In-Booking Add Member Flow State
  const [isAddingMembersToBooking, setIsAddingMembersToBooking] = useState(false);
  const [addMemberSearch, setAddMemberSearch] = useState('');
  const [addMemberGroupFilter, setAddMemberGroupFilter] = useState('All');
  const [addMemberRoleFilter, setAddMemberRoleFilter] = useState('All Roles');
  const [showAddMemberFilters, setShowAddMemberFilters] = useState(false);
  const [showInviteFilters, setShowInviteFilters] = useState(false);
  const [showGroupDetailFilters, setShowGroupDetailFilters] = useState(false);
  const [groupRoleFilter, setGroupRoleFilter] = useState('All Roles');

  // Profession / Role Filter Options
  const professionFilterOptions = [
    { id: 'All Roles', label: 'All Roles' },
    { id: 'Software Engineer', label: '💻 Software' },
    { id: 'Data Analyst', label: '📊 Data & AI' },
    { id: 'Product Designer', label: '🎨 UI/UX' },
    { id: 'Project Manager', label: '📋 Management' },
    { id: 'Cyber Security', label: '🔒 Cyber Security' },
    { id: 'Quality Assurance', label: '⚙️ QA & Testing' },
  ];

  const matchUserRole = (userRole: string, userCategory: string | undefined, filter: string) => {
    if (filter === 'All Roles' || filter === '' || filter === 'All') return true;
    const lowerRole = (userRole || '').toLowerCase();
    const lowerFilter = filter.toLowerCase();
    if (userCategory && userCategory.toLowerCase() === lowerFilter) return true;
    if (lowerRole.includes(lowerFilter)) return true;
    if (filter === 'Software Engineer' && (lowerRole.includes('software') || lowerRole.includes('engineer') || lowerRole.includes('architect') || lowerRole.includes('devops') || lowerRole.includes('system'))) return true;
    if (filter === 'Data Analyst' && (lowerRole.includes('data') || lowerRole.includes('analyst') || lowerRole.includes('ai') || lowerRole.includes('ml') || lowerRole.includes('scientist'))) return true;
    if (filter === 'Product Designer' && (lowerRole.includes('designer') || lowerRole.includes('design') || lowerRole.includes('ui') || lowerRole.includes('ux'))) return true;
    if (filter === 'Project Manager' && (lowerRole.includes('manager') || lowerRole.includes('lead') || lowerRole.includes('scrum') || lowerRole.includes('product owner'))) return true;
    if (filter === 'Cyber Security' && (lowerRole.includes('cyber') || lowerRole.includes('security'))) return true;
    if (filter === 'Quality Assurance' && (lowerRole.includes('qa') || lowerRole.includes('quality') || lowerRole.includes('test'))) return true;
    return false;
  };



  // Notifications Page State
  const [showNotifications, setShowNotifications] = useState(false);

  // Profile State
  const [profileView, setProfileView] = useState<'main' | 'edit' | 'notifications' | 'groups' | 'group-detail'>('main');
  const [editingGroupName, setEditingGroupName] = useState<string | null>(null);
  const [groupPeopleSearch, setGroupPeopleSearch] = useState('');
  const [groupPeopleFilter, setGroupPeopleFilter] = useState<'all' | 'members' | 'available'>('all');
  const [newGroupNameInput, setNewGroupNameInput] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [profileData] = useState({
    name: 'Mohamed Ali',
    email: 'mohamed.ali@bue.edu.eg',
    phone: '+20 123 456 7890',
    department: 'Computer Science',
    id: 'BUE-2024-192',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('All');
  const [filterTime, setFilterTime] = useState('Any Time');
  const [filterDay, setFilterDay] = useState('Any Day');
  const [filterCapacity, setFilterCapacity] = useState('Any Capacity');

  // My Bookings State
  const [bookingTab, setBookingTab] = useState<'upcoming' | 'past'>('upcoming');
  const [viewingBooking, setViewingBooking] = useState<any>(null);
  const [myBookingsDate, setMyBookingsDate] = useState(new Date());
  const [myBookingsActiveDay, setMyBookingsActiveDay] = useState(new Date().getDate());
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  
  // Favorites
  const [favorites, setFavorites] = useState<string[]>([]);

  // Booking Flow State
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingStep, setBookingStep] = useState<'details' | 'time' | 'success' | 'invite'>('details');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [notifiedSlots, setNotifiedSlots] = useState<string[]>([]);
  
  // Instagram-like Invite State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userGroupFilter, setUserGroupFilter] = useState('All');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);
  
  const [customGroups, setCustomGroups] = useState(['Study Group 1', 'Study Group 2', 'Project Team']);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [facultyFilter, setFacultyFilter] = useState('All Roles');

  const [bueUsers, setBueUsers] = useState([
    { id: 'u1', name: 'Ahmed Ali', role: 'Software Engineer', category: 'Software Engineer', group: 'Study Group 1', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 'u2', name: 'Omar Hassan', role: 'Data Analyst', category: 'Data Analyst', group: 'Study Group 2', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 'u3', name: 'Mohamed Tariq', role: 'Project Manager', category: 'Project Manager', group: 'Study Group 1', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 'u4', name: 'Khaled Youssef', role: 'Cloud Architect', category: 'Software Engineer', group: 'Study Group 2', avatar: 'https://i.pravatar.cc/150?img=14' },
    { id: 'u5', name: 'Youssef Omar', role: 'Product Designer', category: 'Product Designer', group: 'Study Group 1', avatar: 'https://i.pravatar.cc/150?img=15' },
    { id: 'u6', name: 'Tarek Mahmoud', role: 'Quality Assurance', category: 'Quality Assurance', group: 'Study Group 2', avatar: 'https://i.pravatar.cc/150?img=33' },
    { id: 'u7', name: 'Ziad Nabil', role: 'Data Scientist', category: 'Data Analyst', group: 'Project Team', avatar: 'https://i.pravatar.cc/150?img=59' },
    { id: 'u8', name: 'Karim Mostafa', role: 'Cybersecurity Analyst', category: 'Cyber Security', group: 'Project Team', avatar: 'https://i.pravatar.cc/150?img=60' },
    { id: 'u9', name: 'Hassan Adel', role: 'AI & ML Engineer', category: 'Data Analyst', group: 'Study Group 1', avatar: 'https://i.pravatar.cc/150?img=68' },
    { id: 'u10', name: 'Amr Ibrahim', role: 'DevOps Engineer', category: 'Software Engineer', group: 'Project Team', avatar: 'https://i.pravatar.cc/150?img=53' },
    { id: 'u11', name: 'Nader Farouk', role: 'UI/UX Specialist', category: 'Product Designer', group: 'Study Group 2', avatar: 'https://i.pravatar.cc/150?img=56' },
    { id: 'u12', name: 'Mostafa Samy', role: 'Systems Engineer', category: 'Software Engineer', group: 'Project Team', avatar: 'https://i.pravatar.cc/150?img=70' },
  ]);

  const notificationsList = [
    { id: 1, title: 'Booking Confirmed', message: 'Your reservation for Meeting Room 1 is confirmed for 10:00 AM.', time: '2m ago', unread: true },
    { id: 4, title: 'New Member Joined', message: 'Mohamed Ali has joined your slot at Study Room B.', time: '15m ago', unread: true, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150' },
    { id: 2, title: 'Upcoming Reminder', message: 'You have a booking in Study Room B in 30 minutes.', time: '1h ago', unread: false },
    { id: 3, title: 'New Facility Added', message: 'Check out the new Library Pods available for booking!', time: '1d ago', unread: false },
  ];

  const [bookings, setBookings] = useState([
    { id: 1, room: 'Meeting Room 1', date: 'May 14', time: '10:00 AM - 11:30 AM', image: getAsset('meeting_room.jpg'), status: 'Confirmed', attendees: ['Mohamed (You)', 'Ahmed Ali'] },
    { id: 2, room: 'Study Room B', date: 'May 15', time: '02:00 PM - 05:00 PM', image: getAsset('study_room.jpg'), status: 'In Progress', attendees: ['Mohamed (You)'] }
  ]);

  const pastBookings = [
    { id: 101, room: 'Study Room B', date: 'Oct 15', time: '09:00 AM - 11:00 AM', image: getAsset('study_room.jpg'), status: 'Completed', attendees: ['Sara Hassan', 'Mohamed Tariq'] },
    { id: 102, room: 'Conference Room A', date: 'Sep 28', time: '01:00 PM - 04:00 PM', image: getAsset('conference_hall.jpg'), status: 'Completed', attendees: [] },
  ];

  const rooms = [
    { 
      name: 'Conference Room A', location: 'Building G, Floor 3', images: [getAsset('conference_hall.jpg')], type: 'Theater', capacity: '8-12 People',
      description: 'A modern, acoustically treated conference room ideal for high-stakes presentations.',
      amenities: [{ icon: Monitor, label: 'Smart TV' }, { icon: PenTool, label: 'Whiteboard' }, { icon: Thermometer, label: 'Climate Control' }], available: true 
    },
    { 
      name: 'Auditorium B', location: 'Building A, Floor 1', images: [getAsset('theater_2.jpg')], type: 'Theater', capacity: '50-100 People',
      description: 'Large auditorium for guest speakers and major events.',
      amenities: [{ icon: Monitor, label: 'Projector' }, { icon: VolumeX, label: 'Sound System' }, { icon: Thermometer, label: 'Climate Control' }], available: true 
    },
    { 
      name: 'Lecture Hall', location: 'Building C, Floor 1', images: [getAsset('theater_3.jpg')], type: 'Theater', capacity: '30-50 People',
      description: 'Standard lecture hall with multiple whiteboards.',
      amenities: [{ icon: PenTool, label: 'Whiteboards' }, { icon: Thermometer, label: 'Climate Control' }], available: true 
    },
    { 
      name: 'Study Room B', location: 'Main Library, Floor 1', images: [getAsset('study_room.jpg')], type: 'Study', capacity: '1-2 People',
      description: 'A dedicated quiet space for deep work and focused study.',
      amenities: [{ icon: Wifi, label: 'Fast WiFi' }, { icon: PenTool, label: 'Whiteboard' }, { icon: Coffee, label: 'Coffee Nearby' }], available: true 
    },
    { 
      name: 'Library Pod 4', location: 'Main Library, Basement', images: [getAsset('library_pod.jpg')], type: 'Study', capacity: '1 Person',
      description: 'Acoustically treated personal pod.',
      amenities: [{ icon: VolumeX, label: 'Soundproof' }, { icon: Thermometer, label: 'A/C' }], available: true 
    },
    { 
      name: 'Quiet Zone', location: 'Main Library, Floor 2', images: [getAsset('study_room_alt.jpg')], type: 'Study', capacity: '1-4 People',
      description: 'Open quiet area for group study.',
      amenities: [{ icon: Wifi, label: 'Fast WiFi' }, { icon: Thermometer, label: 'A/C' }], available: true 
    },
    { 
      name: 'Meeting Room 1', location: 'Building B, Floor 2', images: [getAsset('meeting_room.jpg')], type: 'Meeting', capacity: '4-8 People',
      description: 'Premium meeting room designed for group collaboration.',
      amenities: [{ icon: Monitor, label: 'Smart TV' }, { icon: Wifi, label: 'WiFi' }, { icon: PenTool, label: 'Whiteboard' }], available: true 
    },
    { 
      name: 'Executive Boardroom', location: 'Building G, Floor 5', images: [getAsset('meeting_3.jpg')], type: 'Meeting', capacity: '10-15 People',
      description: 'Luxurious boardroom with city views.',
      amenities: [{ icon: Monitor, label: 'Smart TV' }, { icon: Coffee, label: 'Coffee Machine' }, { icon: Phone, label: 'Polycom' }], available: true 
    },
    { 
      name: 'Collab Space', location: 'Building B, Floor 1', images: [getAsset('meeting_room_alt.jpg')], type: 'Meeting', capacity: '4-6 People',
      description: 'Casual collaboration space with standing desks.',
      amenities: [{ icon: PenTool, label: 'Whiteboards' }, { icon: Wifi, label: 'WiFi' }], available: true 
    },
    { 
      name: 'Computer Lab 3', location: 'Building C, Floor 2', images: [getAsset('computer_lab.jpg')], type: 'Lab', capacity: '20-30 People',
      description: 'Fully equipped computer lab with high-end workstations.',
      amenities: [{ icon: Monitor, label: 'Workstations' }, { icon: Wifi, label: 'Gigabit LAN' }], available: true 
    },
    { 
      name: 'Hardware Lab', location: 'Building E, Basement', images: [getAsset('conference_hall_alt.jpg')], type: 'Lab', capacity: '10-20 People',
      description: 'Electronics and hardware testing lab.',
      amenities: [{ icon: Monitor, label: 'Oscilloscopes' }, { icon: Shield, label: 'Safety Gear' }], available: true 
    },
    { 
      name: 'AI Research Lab', location: 'Building E, Floor 3', images: [getAsset('library_pod_alt.jpg')], type: 'Lab', capacity: '10-15 People',
      description: 'Advanced AI research lab with server access.',
      amenities: [{ icon: Monitor, label: 'GPU Servers' }, { icon: Wifi, label: '10G LAN' }], available: true 
    },
    { 
      name: 'Media Studio A', location: 'Building F, Basement', images: [getAsset('media_studio.jpg')], type: 'Studio', capacity: '2-5 People',
      description: 'Soundproof media recording studio with professional lighting.',
      amenities: [{ icon: Camera, label: 'Lighting' }, { icon: VolumeX, label: 'Soundproof' }], available: true 
    },
    { 
      name: 'Photography Studio', location: 'Building F, Floor 1', images: [getAsset('media_studio.jpg')], type: 'Studio', capacity: '3-6 People',
      description: 'Spacious studio with backdrops.',
      amenities: [{ icon: Camera, label: 'Backdrops' }, { icon: Monitor, label: 'Editing Mac' }], available: true 
    },
    { 
      name: 'Podcast Room', location: 'Building F, Floor 2', images: [getAsset('media_studio.jpg')], type: 'Studio', capacity: '1-3 People',
      description: 'Intimate podcast recording space.',
      amenities: [{ icon: Camera, label: 'Microphones' }, { icon: VolumeX, label: 'Soundproof' }], available: true 
    },
  ];

  const availableRooms = rooms.filter(r => r.available);
  const favoriteRooms = rooms.filter(r => favorites.includes(r.name));

  // Dynamic Time Slots Data with AM/PM (9 AM to 6 PM)
  // Dynamic Time Slots Data based on selected date
  const timeSlotsData = (() => {
    const hash = Number(selectedDate) * 7 + (selectedRoom?.name.length || 0);
    const baseSlots = [
      '09:00 AM - 09:30 AM', '09:30 AM - 10:00 AM', '10:00 AM - 10:30 AM',
      '10:30 AM - 11:00 AM', '11:00 AM - 11:30 AM', '11:30 AM - 12:00 PM',
      '12:00 PM - 12:30 PM', '12:30 PM - 01:00 PM', '01:00 PM - 01:30 PM',
      '01:30 PM - 02:00 PM', '02:00 PM - 02:30 PM', '02:30 PM - 03:00 PM',
      '03:00 PM - 03:30 PM', '03:30 PM - 04:00 PM', '04:00 PM - 04:30 PM',
      '04:30 PM - 05:00 PM', '05:00 PM - 05:30 PM', '05:30 PM - 06:00 PM'
    ];
    
    const possibleNames = ['Ahmed Mohamed', 'S1 CS Group', 'Youssef Ahmed', 'Faculty Meeting'];
    let nameCount = 0;
    
    return baseSlots.map((time, i) => {
      const isAvailable = (hash + i) % 3 !== 0; 
      let bookedBy = null;
      if (!isAvailable) {
         if (nameCount % 2 === 0) {
           bookedBy = possibleNames[(hash + i) % possibleNames.length];
         }
         nameCount++;
      }
      return { time, available: isAvailable, bookedBy };
    });
  })();

  // 7 Days of the week dynamically generated
  const daysData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(myBookingsDate.getFullYear(), myBookingsDate.getMonth(), myBookingsActiveDay + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: d.getDate().toString()
    };
  });

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTimeSlots([]);
  };

  const toggleTimeSlot = (time: string) => {
    if (selectedTimeSlots.includes(time)) {
      setSelectedTimeSlots(prev => prev.filter(t => t !== time));
    } else {
      setSelectedTimeSlots(prev => [...prev, time].sort());
    }
  };

  const calculateDuration = () => {
    const totalMinutes = selectedTimeSlots.length * 30;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) return `${hours}h ${minutes > 0 ? minutes + 'm' : '00m'}`;
    return `${minutes}m`;
  };

  const getFormattedTimeRange = () => {
    if (selectedTimeSlots.length === 0) return '';
    if (selectedTimeSlots.length === 1) return selectedTimeSlots[0];
    const first = selectedTimeSlots[0].split(' - ')[0];
    const last = selectedTimeSlots[selectedTimeSlots.length - 1].split(' - ')[1];
    return `${first} - ${last}`;
  };

  const handleCreateBooking = () => {
    const newBookingId = Date.now();
    setBookings([
      { 
        id: newBookingId, 
        room: selectedRoom.name, 
        date: 'May ' + selectedDate, 
        time: getFormattedTimeRange(),
        image: selectedRoom.images[0],
        status: 'Confirmed',
        attendees: []
      },
      ...bookings
    ]);
    
    setCurrentBookingId(newBookingId);
    setBookingStep('success');
  };

  const handleShare = () => {
    const attendeesNames = bueUsers
      .filter(u => selectedUserIds.includes(u.id))
      .map(u => u.name);

    setBookings(prev => prev.map(b => 
      b.id === currentBookingId 
        ? { ...b, attendees: [...new Set([...b.attendees, ...attendeesNames])] } 
        : b
    ));
    
    finishFlow('Invites sent successfully!');
  };

  const finishFlow = (msg: string) => {
    setSelectedRoom(null);
    setSelectedTimeSlots([]);
    setCurrentBookingId(null);
    setBookingStep('details');
    setViewingBooking(null);
    
    if (msg) {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const cancelBooking = (id: number) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    setViewingBooking(null);
    setToastMessage('Reservation cancelled successfully.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyLink = () => {
    setToastMessage('Link copied to clipboard!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openRoom = (room: any) => {
    setSelectedRoom(room);
    setActiveImageIndex(0);
    setSelectedDate('11');
    setSelectedTimeSlots([]);
    setBookingStep('details');
  };

  const toggleFavorite = (e: any, roomName: string) => {
    e.stopPropagation();
    if (favorites.includes(roomName)) setFavorites(favorites.filter(f => f !== roomName));
    else setFavorites([...favorites, roomName]);
    
    setToastMessage(favorites.includes(roomName) ? 'Removed from favorites' : 'Added to favorites');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const saveProfile = () => {
    setProfileView('main');
    setToastMessage('Profile settings saved successfully!');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const logout = () => {
    setToastMessage('Logged out successfully.');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setActiveTab('home'); // Send them back to home for now
  };

  const filteredRooms = rooms.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = (filterType === 'All' || filterType === 'Available Now') ? true : r.type === filterType;
    // Hide 'In Use' or unavailable rooms entirely from search
    const matchesAvailability = r.available === true;
    return matchesSearch && matchesType && matchesAvailability;
  });

  const filteredUsers = bueUsers.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || u.role.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesGroup = userGroupFilter === 'All' || u.group === userGroupFilter;
    const matchesRole = matchUserRole(u.role, (u as any).category, facultyFilter);
    return matchesSearch && matchesGroup && matchesRole;
  });

  const dashboardCategories = [
    { id: 'All', icon: LayoutGrid, label: 'All Spaces' },
    { id: 'Available Now', icon: Activity, label: 'Available Now' },
    { id: 'Study', icon: BookOpen, label: 'Study' },
    { id: 'Meeting', icon: Users, label: 'Meeting' },
    { id: 'Theater', icon: Presentation, label: 'Theater' },
    { id: 'Lab', icon: Monitor, label: 'Lab' },
    { id: 'Studio', icon: Camera, label: 'Studio' },
  ];

  // -------------------------------------------------------------
  // FULL SCREEN NOTIFICATIONS PAGE
  // -------------------------------------------------------------
  if (showNotifications) {
    return (
      <div className="flex justify-center bg-slate-900 h-screen w-screen overflow-hidden font-sans text-slate-900">
        <div className="w-full max-w-[430px] bg-slate-50 h-full relative shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          <div className="p-4 flex justify-between items-center border-b border-slate-200 bg-white shadow-sm z-10">
            <button onClick={() => setShowNotifications(false)} className="p-2 bg-slate-50 rounded-full text-[#002D62] hover:bg-slate-100 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h2 className="font-bold text-[#002D62] text-lg">Notifications</h2>
            <div className="w-10"></div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {notificationsList.map((notif: any) => (
              <div key={notif.id} className={`p-4 rounded-2xl flex gap-4 transition-all ${notif.unread ? 'bg-white shadow-md border border-blue-100/50' : 'bg-white/60 shadow-sm border border-slate-100'}`}>
                <div className="flex-shrink-0 relative">
                  {notif.avatar ? (
                     <div className="relative">
                       <img src={notif.avatar} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" alt="User" />
                       {notif.unread && <div className="absolute top-0 -right-1 w-3.5 h-3.5 bg-[#DA291C] rounded-full border-2 border-white"></div>}
                     </div>
                  ) : (
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center relative ${notif.id === 1 ? 'bg-green-100 text-green-600' : notif.id === 2 ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                        {notif.id === 1 && <Check size={20} strokeWidth={2.5} />}
                        {notif.id === 2 && <Clock size={20} strokeWidth={2.5} />}
                        {notif.id === 3 && <Monitor size={20} strokeWidth={2.5} />}
                        {notif.unread && <div className="absolute top-0 -right-1 w-3.5 h-3.5 bg-[#DA291C] rounded-full border-2 border-white"></div>}
                     </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold text-[14px] ${notif.unread ? 'text-[#002D62]' : 'text-slate-600'}`}>{notif.title}</h3>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{notif.time}</span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${notif.unread ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // FULL SCREEN ROOM DETAILS & PROGRESSIVE BOOKING FLOW
  // -------------------------------------------------------------
  if (selectedRoom && !viewingBooking) {
    return (
      <div className="flex justify-center bg-slate-900 h-screen w-screen overflow-hidden font-sans text-slate-900">
        <div className="w-full max-w-[430px] bg-slate-50 h-full relative shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
          
          {/* Global Header for Booking Flow */}
          {selectedRoom !== null && bookingStep !== 'success' && (
            <div className={`absolute top-0 left-0 w-full px-5 py-3 pt-5 flex justify-between items-center z-50 transition-colors ${bookingStep === 'details' ? 'bg-transparent' : 'bg-[#002D62] rounded-b-[12px] shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => {
                    if (bookingStep === 'invite') {
                       if (viewingBooking) finishFlow('');
                       else finishFlow('Booking saved. You can invite later.');
                    }
                    else if (bookingStep === 'time') setBookingStep('details');
                    else setSelectedRoom(null);
                  }} 
                  className={bookingStep === 'details' ? "bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all text-[#002D62]" : "text-white p-2 hover:bg-white/10 rounded-full transition-all"}
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
              
              {bookingStep !== 'invite' && bookingStep !== 'details' && (
                <span className="text-[22px] font-serif font-bold text-white drop-shadow-sm absolute left-1/2 -translate-x-1/2">Reservation</span>
              )}
              {bookingStep === 'invite' && (
                <h2 className="text-xl font-serif font-bold text-white tracking-tight text-center absolute left-1/2 -translate-x-1/2">
                  Share Reservation
                </h2>
              )}

              <div className="flex gap-2">
                {bookingStep === 'details' && (
                  <button 
                    onClick={(e) => toggleFavorite(e, selectedRoom.name)}
                    className="bg-white/80 backdrop-blur-md p-2.5 rounded-full shadow-sm hover:bg-white active:scale-95 transition-all text-[#002D62]"
                  >
                    <Heart size={20} fill={favorites.includes(selectedRoom.name) ? '#DA291C' : 'none'} color={favorites.includes(selectedRoom.name) ? '#DA291C' : 'currentColor'} />
                  </button>
                )}
                {bookingStep === 'invite' && (
                  <button 
                    onClick={() => finishFlow(viewingBooking ? '' : 'Booking saved. You can invite later.')}
                    className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:bg-white/30 active:scale-95 transition-all text-white font-bold text-xs"
                  >
                    Skip
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Flow Step 1: Room Details */}
          {bookingStep === 'details' && (
            <div className="flex flex-col h-full overflow-y-auto pb-24 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="relative h-64 w-full bg-slate-200 shrink-0">
                <img src={selectedRoom.images[activeImageIndex]} alt="Room" className="w-full h-full object-cover animate-in fade-in duration-300" />
                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900/60 to-transparent" />
                
                {selectedRoom.images.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <button onClick={() => setActiveImageIndex((prev) => prev === 0 ? selectedRoom.images.length - 1 : prev - 1)} className="bg-black/20 hover:bg-black/40 backdrop-blur-sm p-1.5 rounded-full text-white transition-colors">
                      <ChevronLeft size={24} />
                    </button>
                    <button onClick={() => setActiveImageIndex((prev) => (prev + 1) % selectedRoom.images.length)} className="bg-black/20 hover:bg-black/40 backdrop-blur-sm p-1.5 rounded-full text-white transition-colors">
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
                <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5">
                  {selectedRoom.images.map((_: any, i: number) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeImageIndex ? 'w-4 bg-[#DA291C]' : 'w-1.5 bg-white/70'}`} />
                  ))}
                </div>
              </div>

              <div className="px-6 pt-6">
                <span className="inline-block bg-blue-100/50 text-[#002D62] border border-blue-200 text-[10px] font-black tracking-widest uppercase mb-2 px-2.5 py-0.5 rounded-full">
                  {selectedRoom.type}
                </span>
                <h1 className="text-[28px] font-serif font-bold text-[#002D62] leading-tight">{selectedRoom.name}</h1>
                <p className="text-slate-500 font-medium text-sm flex items-center gap-1 mb-6 mt-1">
                  <MapPin size={14} className="text-[#DA291C]" /> {selectedRoom.location}
                  <span className="mx-1">•</span>
                  <Users size={14} className="text-[#DA291C]" /> {selectedRoom.capacity}
                </p>
                
                <h2 className="text-xl font-serif font-bold text-[#002D62] mb-3">About this Space</h2>
                <p className="text-slate-600 text-[15px] font-medium leading-relaxed tracking-wide mb-8">
                  {selectedRoom.description}
                </p>
                
                <h2 className="text-xl font-serif font-bold text-[#002D62] mb-4">Equipment</h2>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {selectedRoom.amenities.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 shadow-sm px-4 py-3 rounded-xl">
                      <item.icon size={20} className="text-[#DA291C]" /> 
                      <span className="text-[#002D62] text-[15px] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-200 p-6 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button 
                  onClick={() => setBookingStep('time')}
                  className="w-full font-bold text-white text-lg py-4 rounded-xl transition-all bg-[#002D62] hover:bg-[#002D62]/90 flex items-center justify-center gap-2"
                >
                  Book this Space
                </button>
              </div>
            </div>
          )}

          {/* Flow Step 2: Date & Time Picker */}
          {bookingStep === 'time' && (
            <div className="flex flex-col h-full overflow-y-auto pt-20 px-6 animate-in fade-in slide-in-from-right-4 duration-300">
              
              <div className="flex items-center justify-between mb-4 mt-2">
                <h2 className="text-[22px] font-bold text-[#002D62] tracking-tight">Select Date</h2>
                <div className="relative">
                  <div 
                    onClick={() => { setShowMonthPicker(true); setPickerYear(myBookingsDate.getFullYear()); }}
                    className="flex items-center gap-1.5 text-[#002D62] mt-1 cursor-pointer hover:bg-slate-100 p-1.5 -mr-1.5 rounded-lg transition-colors"
                  >
                    <span className="font-bold text-sm tracking-wide">{myBookingsDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    <Calendar size={18} className="opacity-90 stroke-[2.5]" />
                  </div>
                  {showMonthPicker && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowMonthPicker(false)} />
                      <div className="absolute top-full right-0 mt-2 w-[260px] bg-white rounded-2xl shadow-xl shadow-[#002D62]/10 border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex justify-between items-center mb-4 px-2">
                          <button onClick={() => setPickerYear(y => y - 1)} className="p-1 hover:bg-slate-100 rounded-full text-[#002D62] transition-colors">
                            <ChevronLeft size={20} />
                          </button>
                          <span className="font-black text-[#002D62] text-sm tracking-wider">{pickerYear}</span>
                          <button onClick={() => setPickerYear(y => y + 1)} className="p-1 hover:bg-slate-100 rounded-full text-[#002D62] transition-colors">
                            <ChevronRight size={20} />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => {
                            const isSelected = myBookingsDate.getMonth() === idx && myBookingsDate.getFullYear() === pickerYear;
                            return (
                              <button
                                key={m}
                                onClick={() => {
                                  setMyBookingsDate(new Date(pickerYear, idx, 1));
                                  setMyBookingsActiveDay(1);
                                  setSelectedDate('1');
                                  setShowMonthPicker(false);
                                }}
                                className={`py-2.5 text-[11px] font-black uppercase tracking-wider rounded-[14px] transition-all ${
                                  isSelected 
                                    ? 'bg-[#002D62] text-white shadow-md scale-105' 
                                    : 'text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-[#DA291C]'
                                }`}
                              >
                                {m}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between w-full pb-2">
                {daysData.map((d) => {
                  const actualDate = new Date(myBookingsDate.getFullYear(), myBookingsDate.getMonth(), parseInt(d.date));
                  const isToday = actualDate.toDateString() === new Date().toDateString();
                  const isActive = selectedDate === d.date;

                  return (
                    <button 
                      key={d.date}
                      onClick={() => handleDateChange(d.date)}
                      className={`flex flex-col justify-center items-center w-[13%] py-2 rounded-[14px] cursor-pointer transition-all border-2 ${isActive ? (isToday ? 'bg-[#DA291C] border-[#DA291C] shadow-md scale-105' : 'bg-[#002D62] border-[#002D62] shadow-md scale-105') : (isToday ? 'bg-red-50/50 border-[#DA291C]/30 shadow-sm' : 'bg-white shadow-sm border-transparent hover:shadow-md hover:border-slate-100')}`}
                    >
                      <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-white' : (isToday ? 'text-[#DA291C]' : 'text-[#002D62]/70')}`}>{d.day}</span>
                      <span className={`text-lg font-bold mt-0.5 leading-none ${isActive ? 'text-white' : (isToday ? 'text-[#DA291C]' : 'text-slate-700')}`}>{d.date}</span>
                      <div className="w-1 h-1 rounded-full mt-1 bg-transparent"></div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-between items-end mt-6 mb-4">
                <h2 className="text-[22px] font-serif font-bold text-[#002D62]">Available Slots</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pb-32">
                {timeSlotsData.map((slot, idx) => {
                  const isSelected = selectedTimeSlots.includes(slot.time);
                  return (
                    <div key={idx} className="relative">
                      <button 
                        disabled={!slot.available}
                        onClick={() => toggleTimeSlot(slot.time)}
                        className={`w-full h-full flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all border font-bold tracking-wide ${
                          !slot.available 
                            ? 'bg-slate-100/50 border-slate-200 cursor-not-allowed'
                            : isSelected
                              ? 'bg-[#002D62] border-[#002D62] text-white shadow-md'
                              : 'bg-white border-slate-200 text-[#002D62] hover:border-[#002D62]/50'
                        }`}
                      >
                        <span className={`text-[11px] ${!slot.available ? 'text-slate-400' : ''}`}>{slot.time}</span>
                        
                        {!slot.available && slot.bookedBy ? (
                          <span className="text-[9px] text-slate-400/80 font-semibold mt-0.5 max-w-[90%] truncate block">Booked by {slot.bookedBy}</span>
                        ) : null}
                      </button>
                      
                      {!slot.available && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!notifiedSlots.includes(slot.time)) {
                              setNotifiedSlots(prev => [...prev, slot.time]);
                              setToastMessage(`You'll be notified when ${slot.time} is free!`);
                            }
                          }}
                          className={`absolute -top-1.5 -right-1.5 w-7 h-7 shadow-md rounded-full flex items-center justify-center transition-all z-10 ${
                            notifiedSlots.includes(slot.time)
                            ? 'bg-emerald-500 text-white ring-2 ring-emerald-200 shadow-emerald-500/30'
                            : 'bg-white text-[#DA291C] border border-slate-200 hover:bg-slate-50 hover:scale-105'
                          }`}
                        >
                          <Bell size={13} className={notifiedSlots.includes(slot.time) ? 'fill-current animate-[wiggle_1s_ease-in-out_infinite]' : ''} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Fixed Booking Bar */}
              {selectedTimeSlots.length > 0 && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-slate-200 px-6 py-5 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] flex justify-between items-center animate-in slide-in-from-bottom-full duration-300">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">TOTAL DURATION</p>
                    <p className="text-[#002D62] text-[22px] font-serif font-black">{calculateDuration()}</p>
                  </div>
                  <button 
                    onClick={handleCreateBooking}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all bg-[#002D62] text-white shadow-md hover:bg-[#002D62]/90"
                  >
                    Confirm <Check size={18} strokeWidth={3} />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Flow Step 3: Success Screen (Confirm First, Then Share) */}
          {bookingStep === 'success' && (
            <div className="flex flex-col h-full bg-[#002D62] items-center justify-center px-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <div className="w-20 h-20 bg-[#DA291C] rounded-full flex items-center justify-center shadow-[0_0_40px_rgb(218,41,28,0.5)] mb-8 animate-bounce">
                <Check size={40} className="text-white" strokeWidth={4} />
              </div>
              <h1 className="text-3xl font-serif font-bold text-white mb-2 text-center">Booking Confirmed!</h1>
              <p className="text-blue-100 text-center text-sm font-medium mb-12">
                Your reservation for <strong className="text-white">{selectedRoom.name}</strong> is secured.
              </p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={() => {
                    setSelectedUserIds([]);
                    setUserSearchQuery('');
                    setBookingStep('invite');
                  }}
                  className="w-full bg-white text-[#002D62] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-50 transition-all active:scale-95"
                >
                  <Share2 size={20} strokeWidth={2.5} /> Share with Colleagues
                </button>
                <button 
                  onClick={copyLink}
                  className="w-full bg-[#00428f] text-white font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-[#004f9e] transition-all active:scale-95"
                >
                  <Link2 size={20} strokeWidth={2.5} /> Copy Generated Link
                </button>
                <button 
                  onClick={() => finishFlow('')}
                  className="w-full bg-transparent border-2 border-white/20 text-white font-bold text-lg py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95 mt-4"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          )}

          {/* Flow Step 4: Invite Members */}
          {bookingStep === 'invite' && (
            <div className="flex flex-col h-full bg-slate-50 pt-20 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="px-6 mb-6">
                <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#002D62]"></div>
                  <div className="flex justify-between items-start mb-3 border-b border-slate-100 pb-3">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Space</p>
                      <p className="text-sm font-bold text-[#002D62]">{selectedRoom.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-bold text-[#DA291C]">{myBookingsDate.toLocaleDateString('en-US', { month: 'long' })} {selectedDate}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time</p>
                    <p className="text-sm font-bold text-[#002D62]">{getFormattedTimeRange()}</p>
                  </div>
                </div>
              </div>
              
              <div className="px-6 mb-4">
                {/* Search & Filter Button */}
                <div className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Find colleagues by name or role..." 
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="w-full bg-slate-200/50 border-none text-[#002D62] rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:bg-white focus:ring-2 focus:ring-[#002D62]/20 transition-all text-[14px] font-semibold placeholder:text-slate-400"
                    />
                    {userSearchQuery && (
                      <button onClick={() => setUserSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  
                  {/* Filter Button */}
                  <button 
                    onClick={() => setShowInviteFilters(!showInviteFilters)}
                    className={`shrink-0 px-4 rounded-2xl flex items-center gap-1.5 font-bold text-xs transition-all ${
                      showInviteFilters || facultyFilter !== 'All Roles' || userGroupFilter !== 'All' 
                        ? 'bg-[#002D62] text-white shadow-md' 
                        : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    <span>Filter</span>
                    {(facultyFilter !== 'All Roles' || userGroupFilter !== 'All') && (
                      <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                    )}
                  </button>
                </div>

                {/* Collapsible Filter Panel */}
                {showInviteFilters && (
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 mb-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Profession / Role Filters */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5 px-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Filter by Profession / Role</span>
                        {facultyFilter !== 'All Roles' && (
                          <button onClick={() => setFacultyFilter('All Roles')} className="text-[10px] text-[#DA291C] font-bold">Reset</button>
                        )}
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                        {professionFilterOptions.map(opt => (
                          <button
                            key={opt.id}
                            onClick={() => setFacultyFilter(opt.id)}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs ${
                              facultyFilter === opt.id 
                                ? 'bg-[#002D62] text-white shadow-blue-900/20 scale-[1.02]' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Group Filters */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5 px-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Filter by Group</span>
                        {userGroupFilter !== 'All' && (
                          <button onClick={() => setUserGroupFilter('All')} className="text-[10px] text-[#DA291C] font-bold">Reset</button>
                        )}
                      </div>
                      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                        <button
                          onClick={() => setUserGroupFilter('All')}
                          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors shadow-xs ${userGroupFilter === 'All' ? 'bg-[#002D62] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                          All Groups
                        </button>
                        {customGroups.map(group => (
                          <button
                            key={group}
                            onClick={() => setUserGroupFilter(group)}
                            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors shadow-xs ${userGroupFilter === group ? 'bg-[#002D62] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                          >
                            {group}
                          </button>
                        ))}
                        <button
                          onClick={() => setShowAddGroupModal(true)}
                          className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-colors bg-white text-[#DA291C] border border-[#DA291C]/30 hover:bg-[#DA291C]/10 flex items-center gap-1 shadow-xs"
                        >
                          <Plus size={13} /> New Group
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Add Group Modal */}
              {showAddGroupModal && (
                <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
                  <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-300">
                    <h3 className="text-xl font-serif font-bold text-[#002D62] mb-2">Create New Group</h3>
                    <p className="text-slate-500 text-sm mb-4">Enter a name for your new private sharing group.</p>
                    <input 
                      type="text" 
                      placeholder="e.g. Finals Study Group" 
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      className="w-full bg-slate-100 border-none text-[#002D62] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#002D62]/20 transition-all font-semibold mb-6 placeholder:text-slate-400"
                      autoFocus
                    />
                    <div className="flex gap-3">
                      <button 
                        onClick={() => { setShowAddGroupModal(false); setNewGroupName(''); }}
                        className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={() => {
                          if (newGroupName.trim()) {
                            const gname = newGroupName.trim();
                            setCustomGroups([...customGroups, gname]);
                            setUserGroupFilter(gname);
                            if (selectedUserIds.length > 0) {
                              setBueUsers(prev => prev.map(u => selectedUserIds.includes(u.id) ? { ...u, group: gname } : u));
                            }
                            setShowAddGroupModal(false);
                            setNewGroupName('');
                          }
                        }}
                        className="flex-1 py-3 rounded-xl font-bold bg-[#002D62] text-white shadow-md hover:bg-[#003b80] transition-colors"
                      >
                        Create Group
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex-1 overflow-y-auto px-6 pb-32">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Suggested Colleagues</p>
                <div className="space-y-3">
                  {filteredUsers.map((user) => (
                    <div 
                      key={user.id} 
                      onClick={() => {
                        if (selectedUserIds.includes(user.id)) setSelectedUserIds(prev => prev.filter(id => id !== user.id));
                        else setSelectedUserIds(prev => [...prev, user.id]);
                      }}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedUserIds.includes(user.id) 
                        ? 'bg-white border-[#002D62] shadow-[0_4px_15px_rgba(0,45,98,0.1)] scale-[1.02]' 
                        : 'bg-white border-transparent hover:border-slate-200 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm" />
                        <div>
                          <p className="font-bold text-[#002D62] text-[15px] leading-tight mb-0.5">{user.name}</p>
                          <p className="text-[13px] text-slate-400 font-medium">{user.role}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedUserIds.includes(user.id) ? 'bg-[#002D62] border-[#002D62]' : 'border-slate-300'
                      }`}>
                        {selectedUserIds.includes(user.id) && <Check size={14} className="text-white" strokeWidth={3} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-gradient-to-t from-slate-50 via-slate-50 to-transparent pt-12 pb-6 px-6 z-30">
                <button 
                  disabled={selectedUserIds.length === 0}
                  onClick={handleShare}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl flex items-center justify-center gap-2 ${
                    selectedUserIds.length > 0 
                      ? 'bg-[#002D62] text-white shadow-blue-900/20 hover:bg-[#002D62]/90 hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-slate-200 text-slate-400 shadow-none cursor-not-allowed'
                  }`}
                >
                  <Share2 size={20} strokeWidth={2.5} />
                  {selectedUserIds.length > 0 ? `Share with ${selectedUserIds.length} Guest${selectedUserIds.length > 1 ? 's' : ''}` : 'Select Guests to Share'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // DYNAMIC MOCK BOOKINGS FOR SELECTED DATE
  // -------------------------------------------------------------
  const selectedDateStr = `${myBookingsDate.toLocaleDateString('en-US', { month: 'short' })} ${myBookingsActiveDay}`;
  const realSelectedDate = new Date(myBookingsDate.getFullYear(), myBookingsDate.getMonth(), myBookingsActiveDay);
  const todayDate = new Date(new Date().setHours(0,0,0,0));
  const isPhysicallyPast = realSelectedDate < todayDate;
  
  const getDynamicBookings = (isPast = false) => {
    if (isPhysicallyPast && !isPast) return [];
    if (!isPhysicallyPast && isPast) return [];

    let seed = myBookingsDate.getFullYear() + myBookingsDate.getMonth() * 10 + myBookingsActiveDay;
    const hash = Math.abs(Math.sin(seed) * 10000);
    
    if (hash % 10 < 3) return []; // 30% chance of no bookings

    const roomsList = [
      { room: 'Meeting Room 1', image: getAsset('meeting_room.jpg') },
      { room: 'Study Room B', image: getAsset('study_room.jpg') },
      { room: 'Conference Room A', image: getAsset('conference_hall.jpg') },
      { room: 'Library Pod 4', image: getAsset('library_pod.jpg') },
      { room: 'Media Studio', image: getAsset('media_studio.jpg') }
    ];
    
    const count = Math.floor(hash % 3) + 1; // 1 to 3 bookings
    
    const generated = [];
    const maleNamesList = ['Ahmed Ali', 'Omar Hassan', 'Mohamed Tariq', 'Khaled Youssef', 'Youssef Omar', 'Tarek Mahmoud'];
    for (let i = 0; i < count; i++) {
      const roomIndex = Math.floor((hash + i * 13) % roomsList.length);
      const room = roomsList[roomIndex];
      const statuses = isPast ? ['Completed', 'Cancelled', 'Completed'] : ['Confirmed', 'In Progress', 'Pending'];
      
      const attendeeCount = Math.floor((hash + i) % 3) + 1;
      const attendees = ['Mohamed (You)', ...maleNamesList.slice(0, attendeeCount)];

      generated.push({
        id: `mock-${seed}-${isPast ? 'past' : 'up'}-${i}`,
        room: room.room,
        date: selectedDateStr,
        time: ['09:00 AM - 11:00 AM', '10:00 AM - 11:30 AM', '02:00 PM - 05:00 PM', '04:00 PM - 06:00 PM'][Math.floor((hash + i) % 4)],
        image: room.image,
        status: statuses[Math.floor((hash + i) % 3)],
        attendees: attendees
      });
    }
    return generated;
  };

  const displayBookings = [...bookings.filter(b => b.date === selectedDateStr), ...getDynamicBookings(false)];
  const displayPastBookings = [...pastBookings.filter(b => b.date === selectedDateStr), ...getDynamicBookings(true)];

  // -------------------------------------------------------------
  // MAIN APP VIEW (DASHBOARD, SEARCH, BOOKINGS, PROFILE)
  // -------------------------------------------------------------
  return (
    <div className="flex justify-center bg-slate-900 h-screen w-screen overflow-hidden font-sans text-slate-900">
      <div className="w-full max-w-[430px] bg-slate-100 h-full relative shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modern iOS Glassmorphic Top Header - Home */}
        {activeTab === 'home' && (
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 px-5 py-3 flex justify-between items-center shadow-2xs">
            <div className="flex items-center gap-3">
              <div 
                onClick={() => setActiveTab('profile')} 
                className="relative cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#002D62]/20 group-hover:ring-[#002D62] transition-all">
                  <img src={profileData.avatar} alt="Mohamed Ali" className="w-full h-full object-cover" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                  Welcome back 👋
                </span>
                <h1 className="text-base font-black text-[#002D62] tracking-tight leading-tight">
                  Mohamed Ali
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowNotifications(true)} 
                className="relative p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[#002D62] rounded-full transition-all active:scale-95 flex items-center justify-center shadow-2xs"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {notificationsList.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#DA291C] text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-xs">
                    {notificationsList.filter(n => n.unread).length}
                  </span>
                )}
              </button>
            </div>
          </header>
        )}

        <main className="flex-1 overflow-y-auto pb-32 space-y-4">
          
          {/* HOME TAB: DASHBOARD */}
          {activeTab === 'home' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-5 pb-4">


              {/* ③ Next Session Live Pass Card */}
              <div className="px-5">
                {bookings.length > 0 ? (
                  <div 
                    onClick={() => { setActiveTab('bookings'); setViewingBooking(bookings[0]); }}
                    className="bg-gradient-to-br from-[#001D42] via-[#002D62] to-[#0A3D78] text-white rounded-3xl p-5 shadow-xl shadow-[#002D62]/25 border border-blue-900/40 relative overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#DA291C]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="relative z-10">
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full">
                            🎫 Next Session
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                        <button 
                          onClick={(e) => { e.stopPropagation(); setActiveTab('bookings'); setViewingBooking(bookings[0]); setShowQrAccessModal(true); }}
                          className="bg-[#DA291C] hover:bg-[#c0241a] text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-[#DA291C]/30 active:scale-95 transition-all"
                        >
                          <QrCode size={12} /> View QR Pass
                        </button>
                      </div>

                      {/* Room Info */}
                      <div className="flex items-start gap-3 mb-3">
                        <img src={bookings[0].image} alt={bookings[0].room} className="w-14 h-14 rounded-xl object-cover border-2 border-white/20 shadow-md" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg leading-tight truncate">{bookings[0].room}</h3>
                          <p className="text-blue-200 text-xs font-medium mt-0.5 flex items-center gap-1">
                            <Calendar size={11} /> {bookings[0].date} • {bookings[0].time.split(' - ')[0]}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex -space-x-1.5">
                              {bookings[0].attendees.slice(0, 3).map((att: string, ai: number) => (
                                <div key={ai} className="w-5 h-5 rounded-full bg-white/20 border border-white/40 overflow-hidden">
                                  <img src={`https://i.pravatar.cc/150?img=${11 + ai}`} alt={att} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                            <span className="text-[10px] font-semibold text-blue-200">{bookings[0].attendees.length} attending</span>
                          </div>
                        </div>
                      </div>

                      {/* Live Countdown */}
                      <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider">Starts in</span>
                        <div className="flex items-center gap-1.5">
                          {(() => { const cp = getCountdownParts(countdownSeconds); return (
                            <>
                              <span className="bg-white/15 text-white text-sm font-black px-2 py-0.5 rounded-lg min-w-[32px] text-center">{cp.h}</span>
                              <span className="text-white/50 font-bold">:</span>
                              <span className="bg-white/15 text-white text-sm font-black px-2 py-0.5 rounded-lg min-w-[32px] text-center">{cp.m}</span>
                              <span className="text-white/50 font-bold">:</span>
                              <span className="bg-[#DA291C]/80 text-white text-sm font-black px-2 py-0.5 rounded-lg min-w-[32px] text-center">{cp.s}</span>
                            </>
                          ); })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Empty State — No Bookings */
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Calendar size={24} className="text-[#002D62]" />
                    </div>
                    <h3 className="font-bold text-[#002D62] text-lg mb-1">No Upcoming Sessions</h3>
                    <p className="text-slate-500 text-sm mb-4">Book your first study room to get started</p>
                    <button 
                      onClick={() => setActiveTab('search')}
                      className="bg-[#002D62] text-white font-bold text-sm px-6 py-2.5 rounded-full shadow-md active:scale-95 transition-all"
                    >
                      Browse Spaces →
                    </button>
                  </div>
                )}
              </div>




              {/* ⑤ Editorial Announcements (Redesigned) */}
              <section className="px-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[#002D62] tracking-tight">Campus Spotlight</h3>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured</span>
                </div>
                
                {/* Hero Announcement */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-3 h-[160px] cursor-pointer active:scale-[0.99] transition-transform">
                  <img src={getAsset('announcement_1.jpg')} alt="Library Extended" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/95 via-[#002D62]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full z-10">
                    <span className="bg-white/20 backdrop-blur-md border border-white/25 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-block mb-2">📢 Update</span>
                    <h4 className="font-bold text-white text-lg leading-tight mb-0.5">Library Extended Hours</h4>
                    <p className="text-blue-100 text-xs font-medium">Open 24/7 during finals week — all floors accessible.</p>
                  </div>
                </div>

                {/* 2 Compact Announcements */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { title: 'New VR Tech Lab', desc: 'Book our newest VR-capable lab spaces.', tag: '🆕 New', image: getAsset('announcement_2.jpg') },
                    { title: 'Study Hack Event', desc: 'Join the focus group at Room A.', tag: '🎉 Event', image: getAsset('study_room.jpg') },
                  ].map((ann, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden h-[110px] cursor-pointer active:scale-[0.98] transition-transform">
                      <img src={ann.image} alt={ann.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-3 w-full z-10">
                        <span className="bg-white/15 backdrop-blur-md border border-white/20 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1">{ann.tag}</span>
                        <h4 className="font-bold text-white text-xs leading-tight">{ann.title}</h4>
                        <p className="text-slate-300 text-[10px] line-clamp-1">{ann.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Available Now — Classic Card Style */}
              <section className="px-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#002D62] tracking-tight">Available Now</h3>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <button onClick={() => { setActiveTab('search'); setFilterType('All'); }} className="text-xs font-bold text-[#DA291C]">See All</button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
                  {availableRooms.slice(2, 6).map((room, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => openRoom(room)}
                      className="w-[260px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer active:scale-[0.97] transition-all group hover:shadow-md hover:border-[#002D62]/30"
                    >
                      <div className="relative h-32 w-full">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/90 via-[#002D62]/15 to-transparent" />
                        <div className="absolute top-2.5 left-2.5 apple-glass-badge px-2.5 py-0.5 rounded-full text-[9px] font-normal uppercase tracking-wider">
                          {room.type}
                        </div>
                        <button onClick={(e) => toggleFavorite(e, room.name)} className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center apple-glass-btn rounded-full text-white hover:text-[#DA291C] transition-colors z-10">
                          <Heart size={13} fill={favorites.includes(room.name) ? '#DA291C' : 'none'} color={favorites.includes(room.name) ? '#DA291C' : 'white'} />
                        </button>
                        <div className="absolute bottom-0 left-0 p-3 w-full">
                          <h4 className="text-white font-bold text-[15px] mb-0.5 leading-tight">{room.name}</h4>
                          <div className="flex items-center text-slate-300 text-[10px] font-medium gap-1">
                            <MapPin size={10} /> {room.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommended Based on Your History */}
              <section className="px-5">
                <div className="flex items-center justify-between mb-0">
                  <h3 className="text-base font-bold text-[#002D62] tracking-tight">Recommended</h3>
                  <button onClick={() => { setActiveTab('search'); setFilterType('All'); }} className="text-xs font-bold text-[#DA291C]">See All</button>
                </div>
                <p className="text-[11px] font-medium text-slate-500 mb-3">Based on your history</p>

                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
                  {availableRooms.slice(0, 4).map((room, idx) => (
                    <div 
                      key={idx}
                      onClick={() => openRoom(room)}
                      className="w-[260px] shrink-0 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer active:scale-[0.97] transition-all group hover:shadow-md hover:border-[#002D62]/30"
                    >
                      <div className="relative h-32 w-full">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/90 via-[#002D62]/15 to-transparent" />
                        <div className="absolute top-2.5 left-2.5 apple-glass-badge px-2.5 py-0.5 rounded-full text-[9px] font-normal uppercase tracking-wider">
                          {room.type}
                        </div>
                        <button onClick={(e) => toggleFavorite(e, room.name)} className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center apple-glass-btn rounded-full text-white hover:text-[#DA291C] transition-colors z-10">
                          <Heart size={13} fill={favorites.includes(room.name) ? '#DA291C' : 'none'} color={favorites.includes(room.name) ? '#DA291C' : 'white'} />
                        </button>
                        <div className="absolute bottom-0 left-0 p-3 w-full">
                          <h4 className="text-white font-bold text-[15px] mb-0.5 leading-tight">{room.name}</h4>
                          <div className="flex items-center text-slate-300 text-[10px] font-medium gap-1">
                            <MapPin size={10} /> {room.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          )}

          {/* SEARCH TAB */}
          {activeTab === 'search' && (
            <div className="animate-in fade-in duration-500">
              {/* Sticky Top Bar for Search */}
              <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 px-5 py-3.5 flex items-center justify-between shadow-2xs mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#002D62] tracking-tight">Explore Spaces</h2>
                  <p className="text-[11px] font-medium text-slate-400">Find & reserve study rooms on campus</p>
                </div>
                <span className="bg-blue-50 text-[#002D62] border border-blue-100 text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs">
                  {filteredRooms.length} Spaces
                </span>
              </div>

              <div className="space-y-4 px-5">
              
              {/* Circular Category Filters always visible in search */}
              <div className="flex justify-between overflow-x-auto scrollbar-hide pb-2 gap-4">
                {dashboardCategories.map(cat => (
                  <div key={cat.id} className="flex flex-col items-center gap-2 cursor-pointer group shrink-0" onClick={() => setFilterType(cat.id)}>
                    <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 ${filterType === cat.id ? 'bg-[#002D62] text-white shadow-lg scale-105' : 'bg-white text-slate-500 border border-slate-200 group-hover:border-[#002D62]/30 group-hover:text-[#002D62]'}`}>
                      <cat.icon size={22} strokeWidth={filterType === cat.id ? 2.5 : 2} />
                    </div>
                    <span className={`text-[11px] font-bold tracking-tight ${filterType === cat.id ? 'text-[#002D62]' : 'text-slate-500'}`}>{cat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search spaces..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-[#002D62] rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[#002D62] transition-all text-sm font-medium shadow-sm"
                  />
                  {/* Calendar icon requested in search bar area */}
                  <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" />
                </div>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-4 rounded-xl border flex items-center justify-center transition-all ${showFilters ? 'bg-[#002D62] text-white border-[#002D62]' : 'bg-white text-[#002D62] border-slate-200'}`}
                >
                  <SlidersHorizontal size={18} />
                </button>
              </div>

              {showFilters && (
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Calendar size={12} className="text-[#DA291C]"/> Search by Day</p>
                  <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                    {['Any Day', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                      <span 
                        key={day}
                        onClick={() => setFilterDay(day)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                          filterDay === day ? 'bg-[#002D62] text-white border-[#002D62]' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Clock size={12} className="text-[#DA291C]"/> Search by Time</p>
                  <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                    {['Any Time', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM'].map(time => (
                      <span 
                        key={time}
                        onClick={() => setFilterTime(time)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                          filterTime === time ? 'bg-[#002D62] text-white border-[#002D62]' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {time}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2 flex items-center gap-1.5"><Users size={12} className="text-[#DA291C]"/> Search by Capacity</p>
                  <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
                    {['Any Capacity', '1-2 People', '3-6 People', '6-10 People', '10+ People'].map(cap => (
                      <span 
                        key={cap}
                        onClick={() => setFilterCapacity(cap)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border ${
                          filterCapacity === cap ? 'bg-[#002D62] text-white border-[#002D62]' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <section>
                <div className="space-y-4">
                  {filteredRooms.length === 0 ? (
                    <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                       <p className="text-slate-500 text-sm font-medium">No spaces found matching criteria.</p>
                    </div>
                  ) : (
                    filteredRooms.map((room, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => room.available && openRoom(room)}
                        className={`relative rounded-2xl overflow-hidden bg-white shadow-sm border transition-all duration-300 border-slate-200 cursor-pointer hover:shadow-md hover:border-[#002D62]/50 active:scale-[0.98]`}
                      >
                        <div className="h-40 w-full relative">
                          <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/90 via-[#002D62]/15 to-transparent" />
                          
                          <div className="absolute top-2.5 left-2.5 apple-glass-badge px-2.5 py-0.5 rounded-full text-[9px] font-normal uppercase tracking-wider">
                             {room.type}
                          </div>
                          
                          <button 
                            onClick={(e) => toggleFavorite(e, room.name)}
                            className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center apple-glass-btn rounded-full hover:text-[#DA291C] transition-colors z-10"
                          >
                            <Heart size={13} fill={favorites.includes(room.name) ? '#DA291C' : 'none'} color={favorites.includes(room.name) ? '#DA291C' : 'white'} />
                          </button>

                          <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                            <h3 className="text-xl font-bold mb-0.5">{room.name}</h3>
                            <p className="text-xs font-medium text-blue-100 mb-2 flex items-center gap-1 opacity-90"><MapPin size={12}/>{room.location}</p>
                            
                            <div className="flex items-center gap-3 text-[11px] font-medium text-blue-100">
                              <div className="flex items-center gap-1"><Users size={12} /> {room.capacity}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
              </div>
            </div>
          )}

          {/* SAVED SPACES (FAVORITES) TAB */}
          {activeTab === 'favorites' && (
            <div className="animate-in fade-in duration-500">
              {/* Sticky Top Bar for Saved Spaces */}
              <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 px-5 py-3.5 flex items-center justify-between shadow-2xs mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#002D62] tracking-tight">Saved Spaces</h2>
                  <p className="text-[11px] font-medium text-slate-400">Quick access to bookmarked rooms</p>
                </div>
                <span className="bg-red-50 text-[#DA291C] border border-red-100 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
                  <Heart size={13} className="fill-[#DA291C]" />
                  {favoriteRooms.length} Saved
                </span>
              </div>

              <div className="px-5 space-y-4">
              {favoriteRooms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm mt-8">
                   <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Heart size={28} className="text-red-200" />
                   </div>
                   <h3 className="text-lg font-bold text-[#002D62] mb-1">No Saved Spaces</h3>
                   <p className="text-slate-500 text-sm font-medium">Tap the heart icon on any space to save it for quick access later.</p>
                </div>
              ) : (
                <div className="space-y-4 pb-32">
                  {favoriteRooms.map((room, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => room.available && openRoom(room)}
                      className={`relative rounded-2xl overflow-hidden bg-white shadow-sm border transition-all duration-300 border-slate-200 cursor-pointer hover:shadow-md hover:border-[#002D62]/50 active:scale-[0.98]`}
                    >
                      <div className="h-40 w-full relative">
                        <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/90 via-[#002D62]/15 to-transparent" />
                        
                        <div className="absolute top-2.5 left-2.5 apple-glass-badge px-2.5 py-0.5 rounded-full text-[9px] font-normal uppercase tracking-wider">
                           {room.type}
                        </div>
                        
                        <button 
                          onClick={(e) => toggleFavorite(e, room.name)}
                          className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center apple-glass-btn rounded-full hover:text-[#DA291C] transition-colors z-10"
                        >
                          <Heart size={13} fill={favorites.includes(room.name) ? '#DA291C' : 'none'} color={favorites.includes(room.name) ? '#DA291C' : 'white'} />
                        </button>

                        <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                          <h3 className="text-xl font-bold mb-0.5">{room.name}</h3>
                          <p className="text-xs font-medium text-blue-100 mb-2 flex items-center gap-1 opacity-90"><MapPin size={12}/>{room.location}</p>
                          
                          <div className="flex items-center gap-3 text-[11px] font-medium text-blue-100">
                            <div className="flex items-center gap-1"><Users size={12} /> {room.capacity}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </div>
          )}

          {/* MY BOOKINGS TAB & UPCOMING DETAILS MODAL */}
          {activeTab === 'bookings' && (
            <div className="animate-in fade-in duration-500">
              
              {/* Viewing Details State for Both Upcoming & Past */}
              {viewingBooking ? (
                <div className="absolute inset-0 bg-slate-100 z-50 flex flex-col animate-in slide-in-from-bottom-6 duration-300">
                  {/* Top Bar Header */}
                  <div className="px-5 py-3.5 flex justify-between items-center border-b border-slate-200/80 bg-white/90 backdrop-blur-xl shadow-2xs z-20 sticky top-0">
                    <button 
                      onClick={() => { setViewingBooking(null); setIsAddingMembersToBooking(false); }} 
                      className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-[#002D62] transition-colors active:scale-95 shadow-2xs flex items-center justify-center"
                      title="Back to Bookings"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    
                    <div className="text-center">
                      <h2 className="font-bold text-[#002D62] text-sm leading-tight">Reservation Pass</h2>
                      <p className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">#BUE-2026-0{viewingBooking.id}</p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => setShowQrAccessModal(true)}
                        className="p-2 text-[#002D62] bg-blue-50 hover:bg-blue-100 border border-blue-100 rounded-full transition-all active:scale-95 shadow-2xs flex items-center justify-center"
                        title="Show Digital QR Pass"
                      >
                        <QrCode size={17} />
                      </button>
                      <button 
                        onClick={() => {
                          setToastMessage(`Booking pass link copied!`);
                          setShowToast(true);
                          setTimeout(() => setShowToast(false), 3000);
                        }} 
                        className="p-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-all active:scale-95 shadow-2xs flex items-center justify-center"
                        title="Share Reservation"
                      >
                        <Share2 size={17} />
                      </button>
                      {viewingBooking.status !== 'Completed' && (
                        <button 
                          onClick={() => cancelBooking(viewingBooking.id)} 
                          className="p-2 text-[#DA291C] bg-red-50 hover:bg-red-100 border border-red-100 rounded-full transition-all active:scale-95 shadow-2xs flex items-center justify-center"
                          title="Cancel Reservation"
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* Super Page Scrollable Content */}
                  <div className="flex-1 overflow-y-auto px-5 pt-4 pb-36 space-y-4">
                    
                    {/* Apple-Wallet / Digital Ticket Card */}
                    <div className="bg-gradient-to-br from-[#001D42] via-[#002D62] to-[#0A3D78] text-white rounded-3xl p-5 shadow-xl shadow-[#002D62]/20 border border-blue-900/40 relative overflow-hidden">
                      {/* Ambient Decorative Elements */}
                      <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#DA291C]/20 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />
                      
                      {/* Ticket Top Header */}
                      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#DA291C] flex items-center justify-center font-black text-white text-[11px] shadow-sm">
                            B
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold text-blue-200 tracking-wider block leading-none">THE BRITISH UNIVERSITY</span>
                            <span className="text-[8px] font-bold text-slate-300 tracking-widest uppercase">Smart Campus Pass</span>
                          </div>
                        </div>

                        {viewingBooking.status === 'Completed' ? (
                          <span className="bg-white/15 text-slate-200 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
                            Completed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Confirmed Pass
                          </span>
                        )}
                      </div>

                      {/* Hero Image with Rounded Frame */}
                      <div className="relative rounded-2xl overflow-hidden mb-4 shadow-md group">
                        <img 
                          src={viewingBooking.image} 
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" 
                          alt={viewingBooking.room} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Badges on Image */}
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20">
                            Building C • Floor 2
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="bg-[#DA291C]/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Users size={11} /> 6 Seats
                          </span>
                        </div>

                        {/* Room Info Bottom Overlay */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                          <div>
                            <h1 className="text-xl font-black text-white leading-tight drop-shadow-sm">
                              {viewingBooking.room}
                            </h1>
                            <p className="text-[11px] font-medium text-slate-200 flex items-center gap-1 mt-0.5">
                              <MapPin size={11} className="text-[#DA291C]" /> Room C-204 • Study Lab
                            </p>
                          </div>
                          
                          <button 
                            onClick={() => {
                              const roomObj = rooms.find(r => r.name === viewingBooking.room);
                              if (roomObj) {
                                setViewingBooking(null);
                                openRoom(roomObj);
                              }
                            }} 
                            className="text-white hover:text-blue-200 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-xl transition-all active:scale-95 border border-white/20 flex items-center gap-1 text-[11px] font-bold"
                          >
                            <span>Details</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Ticket Divider Notch */}
                      <div className="relative py-2 my-1">
                        <div className="border-t-2 border-dashed border-white/20" />
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full" />
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full" />
                      </div>

                      {/* Pass Quick Details Matrix */}
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block mb-0.5">Reserved Date</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Calendar size={13} className="text-[#DA291C]" /> {viewingBooking.date}
                          </span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest block mb-0.5">Reserved Slot</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Clock size={13} className="text-emerald-400" /> {viewingBooking.time}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Live Real-time Countdown Banner */}
                    {viewingBooking.status !== 'Completed' ? (
                      <div className="bg-gradient-to-r from-slate-900 to-[#002D62] text-white p-4 rounded-2xl shadow-md border border-slate-700/60 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#DA291C] animate-ping" />
                            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-200 flex items-center gap-1.5">
                              <Clock size={12} className="text-[#DA291C]" /> Session Starts In
                            </span>
                          </div>
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-300/30">
                            Upcoming
                          </span>
                        </div>

                        {/* Digital Countdown Timer Digits */}
                        <div className="grid grid-cols-3 gap-2 text-center py-1">
                          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-2 px-1 shadow-inner">
                            <span className="text-2xl font-black text-white font-mono tracking-tight block">
                              {getCountdownParts(countdownSeconds).h}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Hours</span>
                          </div>
                          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-2 px-1 shadow-inner">
                            <span className="text-2xl font-black text-amber-400 font-mono tracking-tight block">
                              {getCountdownParts(countdownSeconds).m}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Minutes</span>
                          </div>
                          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl py-2 px-1 shadow-inner">
                            <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight block">
                              {getCountdownParts(countdownSeconds).s}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Seconds</span>
                          </div>
                        </div>
                        
                        <p className="text-[10px] text-slate-300 text-center font-medium mt-2 flex items-center justify-center gap-1">
                          <Sparkles size={10} className="text-amber-400" />
                          Door lock & Turnstiles will auto-unlock 15 minutes before slot time
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-200/80 p-3.5 rounded-2xl border border-slate-300 text-center">
                        <span className="text-xs font-bold text-slate-700 block">This session was completed on {viewingBooking.date}</span>
                        <button 
                          onClick={() => {
                            const roomObj = rooms.find(r => r.name === viewingBooking.room);
                            if (roomObj) {
                              setViewingBooking(null);
                              openRoom(roomObj);
                            }
                          }}
                          className="mt-2 text-xs font-bold text-[#002D62] hover:underline"
                        >
                          Book this room again →
                        </button>
                      </div>
                    )}

                    {/* Digital Door Access & Smart Pass Widget */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-50 text-[#002D62] rounded-xl">
                            <Key size={16} />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-[#002D62]">Smart Access & Connectivity</h3>
                            <p className="text-[10px] font-medium text-slate-400">Digital Key Pass & Campus Wi-Fi</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setShowQrAccessModal(true)}
                          className="text-[11px] font-bold text-[#DA291C] hover:underline flex items-center gap-1"
                        >
                          <QrCode size={13} /> Show QR Pass
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {/* Door Unlock Button */}
                        <button 
                          onClick={() => {
                            setToastMessage(`🚪 Door Unlocked! Welcome to ${viewingBooking.room}.`);
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                          }}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2.5 rounded-xl text-left transition-all active:scale-95 group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Door Lock</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:animate-ping" />
                          </div>
                          <span className="text-xs font-bold text-[#002D62] block">Tap to Unlock</span>
                          <span className="text-[9px] font-medium text-slate-400">Digital Campus Key</span>
                        </button>

                        {/* Fast Wi-Fi Access */}
                        <button 
                          onClick={() => {
                            setToastMessage(`Wi-Fi passcode copied: BUE2026Secure`);
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                          }}
                          className="bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2.5 rounded-xl text-left transition-all active:scale-95"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Wi-Fi Network</span>
                            <Copy size={11} className="text-slate-400" />
                          </div>
                          <span className="text-xs font-bold text-[#002D62] block">BUE-Campus-5G</span>
                          <span className="text-[9px] font-medium text-emerald-600">Copy Passcode</span>
                        </button>
                      </div>
                    </div>

                    {/* Room Included Amenities */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                      <h3 className="text-xs font-bold text-[#002D62] uppercase tracking-wider mb-2.5">
                        Included Room Amenities
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { name: '4K Smart Display', icon: Monitor },
                          { name: '1 Gbps Wi-Fi 6E', icon: Wifi },
                          { name: 'Digital Whiteboard', icon: PenTool },
                          { name: 'Power & USB-C', icon: Sparkles },
                          { name: 'Climate Control', icon: Thermometer },
                        ].map((amenity, idx) => {
                          const IconComp = amenity.icon;
                          return (
                            <span key={idx} className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-semibold">
                              <IconComp size={12} className="text-[#002D62]" />
                              {amenity.name}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Participants Section / In-Booking Invite Subview */}
                    {isAddingMembersToBooking ? (
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm animate-in slide-in-from-right-4 duration-300">
                        {/* Subview Header */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                          <button 
                            onClick={() => setIsAddingMembersToBooking(false)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-[#002D62] transition-colors"
                          >
                            <ArrowLeft size={16} />
                          </button>
                          <div className="text-center">
                            <h3 className="font-bold text-[#002D62] text-sm">Add Members to Reservation</h3>
                            <p className="text-[10px] text-slate-400 font-medium">{viewingBooking.room}</p>
                          </div>
                          <div className="w-7" />
                        </div>

                        {/* Search & Filter Button Row */}
                        <div className="flex items-center gap-2 mb-2.5">
                          <div className="relative flex-1">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                              type="text"
                              placeholder="Search colleagues by name or role..."
                              value={addMemberSearch}
                              onChange={(e) => setAddMemberSearch(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-8 py-2 text-xs font-medium focus:outline-none focus:border-[#002D62]"
                            />
                            {addMemberSearch && (
                              <button onClick={() => setAddMemberSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                                <X size={12} />
                              </button>
                            )}
                          </div>

                          {/* Filter Button */}
                          <button
                            onClick={() => setShowAddMemberFilters(!showAddMemberFilters)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 border ${
                              showAddMemberFilters || addMemberRoleFilter !== 'All Roles' || addMemberGroupFilter !== 'All'
                                ? 'bg-[#002D62] text-white border-[#002D62] shadow-xs'
                                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            <SlidersHorizontal size={13} />
                            <span>Filter</span>
                            {(addMemberRoleFilter !== 'All Roles' || addMemberGroupFilter !== 'All') && (
                              <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                            )}
                          </button>
                        </div>

                        {/* Collapsible Filter Panel */}
                        {showAddMemberFilters && (
                          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 mb-3 space-y-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                            {/* Profession / Role Filters */}
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Filter by Profession / Role</span>
                                {addMemberRoleFilter !== 'All Roles' && (
                                  <button onClick={() => setAddMemberRoleFilter('All Roles')} className="text-[9px] text-[#DA291C] font-bold">Reset</button>
                                )}
                              </div>
                              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                                {professionFilterOptions.map((opt) => (
                                  <button
                                    key={opt.id}
                                    onClick={() => setAddMemberRoleFilter(opt.id)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                                      addMemberRoleFilter === opt.id
                                        ? 'bg-[#002D62] text-white shadow-xs scale-[1.02]'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                    }`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Group Filter Pills */}
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Filter by Group</span>
                                {addMemberGroupFilter !== 'All' && (
                                  <button onClick={() => setAddMemberGroupFilter('All')} className="text-[9px] text-[#DA291C] font-bold">Reset</button>
                                )}
                              </div>
                              <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                                {['All', ...customGroups].map((grp) => (
                                  <button
                                    key={grp}
                                    onClick={() => setAddMemberGroupFilter(grp)}
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 transition-all ${
                                      addMemberGroupFilter === grp
                                        ? 'bg-[#DA291C] text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                                    }`}
                                  >
                                    {grp === 'All' ? 'All Groups' : grp}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Users List */}
                        <div className="max-h-[220px] overflow-y-auto space-y-2 pr-1 mb-4">
                          {bueUsers
                            .filter(u => {
                              const matchesSearch = u.name.toLowerCase().includes(addMemberSearch.toLowerCase()) || u.role.toLowerCase().includes(addMemberSearch.toLowerCase());
                              const matchesGroup = addMemberGroupFilter === 'All' || u.group === addMemberGroupFilter;
                              const matchesRole = matchUserRole(u.role, (u as any).category, addMemberRoleFilter);
                              return matchesSearch && matchesGroup && matchesRole;
                            })
                            .map((u) => {
                              const isSelected = viewingBooking.attendees?.includes(u.name);
                              return (
                                <div
                                  key={u.id}
                                  onClick={() => {
                                    const currentList = viewingBooking.attendees || ['Mohamed (You)'];
                                    let nextList: string[];
                                    if (isSelected) {
                                      nextList = currentList.filter((a: string) => a !== u.name);
                                    } else {
                                      nextList = [...currentList, u.name];
                                    }
                                    if (!nextList.includes('Mohamed (You)')) {
                                      nextList = ['Mohamed (You)', ...nextList];
                                    }
                                    const updated = { ...viewingBooking, attendees: nextList };
                                    setViewingBooking(updated);
                                    setBookings(prev => prev.map(b => b.id === viewingBooking.id ? updated : b));
                                  }}
                                  className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer border transition-all ${
                                    isSelected ? 'bg-blue-50/80 border-blue-200' : 'bg-white border-slate-200 hover:bg-slate-50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                                    <div>
                                      <span className="text-xs font-bold text-[#002D62] block leading-tight">{u.name}</span>
                                      <span className="text-[10px] font-medium text-slate-400">{u.role}</span>
                                    </div>
                                  </div>

                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                                    isSelected ? 'bg-[#002D62] border-[#002D62] text-white' : 'border-slate-300 bg-white'
                                  }`}>
                                    {isSelected && <Check size={12} strokeWidth={3} />}
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        {/* Done Button */}
                        <button
                          onClick={() => {
                            setIsAddingMembersToBooking(false);
                            setToastMessage(`Updated participants for ${viewingBooking.room}!`);
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                          }}
                          className="w-full bg-[#002D62] hover:bg-[#002D62]/90 text-white font-bold py-2.5 rounded-xl text-xs shadow-md active:scale-95 transition-all"
                        >
                          Confirm & Done ({viewingBooking.attendees?.length || 0} Members)
                        </button>
                      </div>
                    ) : (
                      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                         <div className="flex items-center justify-between">
                           <div>
                             <h2 className="text-xs font-bold text-[#002D62] uppercase tracking-wider">Group Participants</h2>
                             <p className="text-[10px] font-medium text-slate-400">
                               {viewingBooking.attendees?.length || 0} Members Invited
                             </p>
                           </div>
                           {viewingBooking.status !== 'Completed' && (
                             <button 
                               onClick={() => setIsAddingMembersToBooking(true)}
                               className="text-xs font-bold text-[#DA291C] flex items-center gap-1 hover:underline bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-100 active:scale-95 transition-all"
                             >
                               <Plus size={13} /> Add Member
                             </button>
                           )}
                         </div>
                         
                         {/* Group Status Bar */}
                         {viewingBooking.attendees && viewingBooking.attendees.length > 0 && (
                           <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                             <div>
                               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Confirmation Status</span>
                               <span className="text-xs font-bold text-[#002D62]">
                                 {Math.max(1, Math.ceil(viewingBooking.attendees.length / 2))}/{viewingBooking.attendees.length} Confirmed
                               </span>
                             </div>
                             <div className="flex items-center gap-1.5">
                               <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                 <div 
                                   className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                                   style={{ width: `${(Math.max(1, Math.ceil(viewingBooking.attendees.length / 2)) / viewingBooking.attendees.length) * 100}%` }}
                                 />
                               </div>
                               <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                                 Active
                               </span>
                             </div>
                           </div>
                         )}
                         
                         {viewingBooking.attendees && viewingBooking.attendees.length > 0 ? (
                           <div className="space-y-2">
                             {viewingBooking.attendees.map((att: string, i: number) => {
                               const userMatch = bueUsers.find(u => u.name === att);
                               const avatarSrc = userMatch ? userMatch.avatar : `https://i.pravatar.cc/150?img=${11 + (i % 5)}`;
                               const isConfirmed = i === 0 || i % 2 === 0;
                               
                               return (
                                 <div key={i} className="bg-slate-50/80 p-2.5 rounded-xl flex items-center justify-between gap-3 border border-slate-100">
                                   <div className="flex items-center gap-2.5">
                                     <img 
                                       src={avatarSrc} 
                                       alt={att} 
                                       className="w-8 h-8 rounded-full object-cover border border-slate-200" 
                                     />
                                     <div>
                                       <span className="text-xs font-bold text-[#002D62] block leading-tight">{att}</span>
                                       <span className="text-[10px] font-medium text-slate-400">
                                         {att.includes('You') ? 'Organizer / Host' : (userMatch?.role || 'BUE Colleague')}
                                       </span>
                                     </div>
                                   </div>

                                   <div className="flex items-center gap-2">
                                     {isConfirmed ? (
                                       <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                                         Confirmed <Check size={11} strokeWidth={3} />
                                       </span>
                                     ) : (
                                       <div className="flex items-center gap-1.5">
                                         <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                                           Pending...
                                         </span>
                                         {viewingBooking.status !== 'Completed' && (
                                           <button 
                                             onClick={(e) => { 
                                               e.stopPropagation(); 
                                               setToastMessage(`Reminder sent to ${att}!`); 
                                               setShowToast(true); 
                                               setTimeout(() => setShowToast(false), 3000); 
                                             }}
                                             className="bg-white px-2 py-1 rounded-md border border-slate-200 shadow-xs text-[9px] font-bold text-[#DA291C] hover:bg-slate-100 transition-colors flex items-center gap-1 active:scale-95"
                                           >
                                             <Bell size={9} /> Remind
                                           </button>
                                         )}
                                       </div>
                                     )}
                                   </div>
                                 </div>
                               );
                             })}
                           </div>
                         ) : (
                           <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                             <p className="text-slate-500 text-xs">No colleagues invited yet.</p>
                             {viewingBooking.status !== 'Completed' && (
                               <button 
                                 onClick={() => setIsAddingMembersToBooking(true)}
                                 className="mt-2.5 mx-auto flex items-center gap-1.5 bg-[#002D62] text-white px-3.5 py-1.5 rounded-lg font-bold text-xs shadow-xs hover:bg-[#002D62]/90 transition-all"
                               >
                                 <Users size={13} /> Invite Colleagues
                               </button>
                             )}
                           </div>
                         )}
                      </div>
                    )}
                  </div>

                  {/* Sticky Bottom Actions Bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg z-20 flex gap-2.5">
                    <button 
                      onClick={() => {
                        setToastMessage(`Navigating to ${viewingBooking.room} (Building C • Floor 2)...`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                      }}
                      className="flex-1 bg-[#002D62] hover:bg-[#002D62]/90 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    >
                      <Navigation size={14} /> Get Campus Directions
                    </button>

                    <button 
                      onClick={() => {
                        setToastMessage(`Calendar invite added for ${viewingBooking.date}!`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                      }}
                      className="px-4 bg-slate-100 hover:bg-slate-200 text-[#002D62] font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      title="Sync with Calendar"
                    >
                      <Calendar size={14} /> Sync
                    </button>
                  </div>

                  {/* Digital QR Access Modal */}
                  {showQrAccessModal && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                      <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center space-y-4 animate-in zoom-in-95 duration-200 relative">
                        <button 
                          onClick={() => setShowQrAccessModal(false)}
                          className="absolute right-4 top-4 p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600"
                        >
                          <X size={16} />
                        </button>

                        <div className="pt-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#DA291C] block">Smart Campus Gate Pass</span>
                          <h3 className="text-lg font-black text-[#002D62]">{viewingBooking.room}</h3>
                          <p className="text-[11px] font-semibold text-slate-400">{viewingBooking.date} • {viewingBooking.time}</p>
                        </div>

                        {/* High Quality Digital QR Code Box */}
                        <div className="bg-slate-50 border-2 border-dashed border-[#002D62]/30 p-4 rounded-2xl flex flex-col items-center justify-center">
                          <div className="w-44 h-44 bg-white p-3 rounded-xl shadow-inner flex flex-col items-center justify-center relative overflow-hidden border border-slate-200">
                            {/* Simulated High-Res QR code graphic */}
                            <div className="grid grid-cols-7 gap-1 w-full h-full p-1 opacity-90">
                              {Array.from({ length: 49 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`rounded-xs ${
                                    i === 0 || i === 6 || i === 42 || i === 48 || (i % 3 === 0 && i % 2 !== 0) || i === 24
                                      ? 'bg-[#002D62]'
                                      : i % 2 === 0
                                      ? 'bg-slate-900'
                                      : 'bg-transparent'
                                  }`} 
                                />
                              ))}
                            </div>
                            {/* Animated Scanner Laser */}
                            <div className="absolute left-0 right-0 h-0.5 bg-[#DA291C] shadow-[0_0_8px_#DA291C] animate-pulse" style={{ top: '48%' }} />
                          </div>
                          <span className="text-[10px] font-mono font-bold text-[#002D62] mt-3 tracking-widest">
                            #BUE-PASS-{viewingBooking.id}984-X
                          </span>
                        </div>

                        <p className="text-[10px] text-slate-500 font-medium">
                          Scan this pass at building entrance turnstiles and study room electronic door readers.
                        </p>

                        <button 
                          onClick={() => {
                            setShowQrAccessModal(false);
                            setToastMessage(`Access pass saved to Apple Wallet / Google Pay!`);
                            setShowToast(true);
                            setTimeout(() => setShowToast(false), 3000);
                          }}
                          className="w-full bg-[#002D62] text-white font-bold py-2.5 rounded-xl text-xs shadow-md active:scale-95 transition-all"
                        >
                          Add to Digital Wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Sticky Top Bar for My Bookings */}
                  <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 px-5 py-3.5 flex items-center justify-between shadow-2xs">
                    <div>
                      <h2 className="text-xl font-bold text-[#002D62] tracking-tight">My Bookings</h2>
                      <p className="text-[11px] font-medium text-slate-400">Manage room reservations</p>
                    </div>
                    
                    <div 
                      onClick={() => { setShowMonthPicker(true); setPickerYear(myBookingsDate.getFullYear()); }}
                      className="relative flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/80 border border-slate-200/80 px-3 py-1.5 rounded-full cursor-pointer transition-all active:scale-95 shadow-2xs"
                    >
                      <Calendar size={15} className="text-[#002D62]" />
                      <span className="text-xs font-bold text-[#002D62]">{myBookingsDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>

                    {showMonthPicker && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setShowMonthPicker(false)} />
                        <div className="absolute top-full right-0 mt-2 w-[260px] bg-white rounded-2xl shadow-xl shadow-[#002D62]/10 border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="flex justify-between items-center mb-4 px-2">
                            <button onClick={() => setPickerYear(y => y - 1)} className="p-1 hover:bg-slate-100 rounded-full text-[#002D62] transition-colors">
                              <ChevronLeft size={20} />
                            </button>
                            <span className="font-black text-[#002D62] text-sm tracking-wider">{pickerYear}</span>
                            <button onClick={() => setPickerYear(y => y + 1)} className="p-1 hover:bg-slate-100 rounded-full text-[#002D62] transition-colors">
                              <ChevronRight size={20} />
                            </button>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => {
                              const isSelected = myBookingsDate.getMonth() === idx && myBookingsDate.getFullYear() === pickerYear;
                              return (
                                <button
                                  key={m}
                                  onClick={() => {
                                    setMyBookingsDate(new Date(pickerYear, idx, 1));
                                    setMyBookingsActiveDay(1);
                                    setShowMonthPicker(false);
                                  }}
                                  className={`py-2.5 text-[11px] font-black uppercase tracking-wider rounded-[14px] transition-all ${
                                    isSelected 
                                      ? 'bg-[#002D62] text-white shadow-md scale-105' 
                                      : 'text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-[#DA291C]'
                                  }`}
                                >
                                  {m}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="px-5 space-y-4">
                  {/* Date Strip */}
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-5 px-5 mb-4">
                    {Array.from({ length: new Date(myBookingsDate.getFullYear(), myBookingsDate.getMonth() + 1, 0).getDate() }, (_, i) => {
                      const d = new Date(myBookingsDate.getFullYear(), myBookingsDate.getMonth(), i + 1);
                      const isToday = d.toDateString() === new Date().toDateString();
                      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                      const isActive = myBookingsActiveDay === i + 1;
                      
                      const dIsPast = d < new Date(new Date().setHours(0,0,0,0));
                      const seedForDay = myBookingsDate.getFullYear() + myBookingsDate.getMonth() * 10 + (i + 1);
                      const hashForDay = Math.abs(Math.sin(seedForDay) * 10000);
                      const hasMockForDay = (hashForDay % 10 >= 3);
                      
                      const checkDateStr = `${myBookingsDate.toLocaleDateString('en-US', { month: 'short' })} ${i + 1}`;
                      const tabMatchesDate = (bookingTab === 'upcoming' && !dIsPast) || (bookingTab === 'past' && dIsPast);
                      
                      const hasUserBooking = bookingTab === 'upcoming' ? bookings.some(b => b.date === checkDateStr) : pastBookings.some(b => b.date === checkDateStr);
                      const hasAnyBooking = hasUserBooking || (tabMatchesDate && hasMockForDay);
                      
                      const hasDot = isToday ? 'bg-white' : (hasAnyBooking ? 'bg-[#DA291C]' : null);
                      
                      return (
                        <div 
                          key={i} 
                          onClick={() => setMyBookingsActiveDay(i + 1)} 
                          className={`flex flex-col items-center justify-center shrink-0 w-[13%] py-2 rounded-[14px] cursor-pointer transition-all border-2 ${isActive ? (isToday ? 'bg-[#DA291C] border-[#DA291C] shadow-md scale-105' : 'bg-[#002D62] border-[#002D62] shadow-md scale-105') : (isToday ? 'bg-red-50/50 border-[#DA291C]/30 shadow-sm' : 'bg-white shadow-sm border-transparent hover:shadow-md hover:border-slate-100')}`}
                        >
                          <span className={`text-[9px] font-black uppercase tracking-wider ${isActive ? 'text-white' : (isToday ? 'text-[#DA291C]' : 'text-[#002D62]/70')}`}>{dayName}</span>
                          <span className={`text-lg font-bold mt-0.5 leading-none ${isActive ? 'text-white' : (isToday ? 'text-[#DA291C]' : 'text-slate-700')}`}>{i + 1}</span>
                          <div className={`w-1 h-1 rounded-full mt-1 ${hasDot ? hasDot : 'bg-transparent'}`}></div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex bg-slate-200/50 p-1 rounded-xl mb-4">
                    <button 
                      onClick={() => setBookingTab('upcoming')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${bookingTab === 'upcoming' ? 'bg-[#002D62] text-white shadow-sm' : 'text-slate-500'}`}
                    >
                      Upcoming
                    </button>
                    <button 
                      onClick={() => setBookingTab('past')}
                      className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${bookingTab === 'past' ? 'bg-[#002D62] text-white shadow-sm' : 'text-slate-500'}`}
                    >
                      Past
                    </button>
                  </div>
                  <div className="space-y-4 pb-32">
                    {bookingTab === 'upcoming' && (
                      displayBookings.length > 0 ? (
                        displayBookings.map((booking) => (
                          <div 
                            key={booking.id} 
                            onClick={() => setViewingBooking(booking)}
                            className="relative rounded-2xl overflow-hidden bg-white shadow-sm border transition-all duration-300 border-slate-200 cursor-pointer hover:shadow-md hover:border-[#002D62]/50 active:scale-[0.98]"
                          >
                            <div className="h-40 w-full relative">
                              <img src={booking.image} alt={booking.room} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/95 via-[#002D62]/50 to-transparent" />
                              
                              <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm backdrop-blur-md border ${
                                booking.status === 'Confirmed' 
                                  ? 'bg-white/95 text-[#002D62] border-white/40' 
                                  : booking.status === 'In Progress' 
                                  ? 'bg-white/95 text-amber-600 border-white/40' 
                                  : 'bg-white/95 text-[#DA291C] border-white/40'
                              }`}>
                                {booking.status}
                              </div>

                              <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                                <h3 className="text-[22px] font-bold mb-1 tracking-tight leading-tight">{booking.room}</h3>
                                <div className="flex flex-col gap-1.5 mt-2">
                                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-100 opacity-90">
                                    <Calendar size={13} className="text-white" /> {booking.date} <span className="opacity-50 mx-0.5">•</span> {booking.time.split(' - ')[0]}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-100/80">
                                    <Users size={12} /> {booking.attendees.length} Attendees
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                          <Calendar className="text-slate-300 mb-3" size={40} />
                          <h3 className="text-slate-700 font-bold text-lg mb-1">No Bookings Found</h3>
                          <p className="text-slate-500 text-sm">There are no upcoming bookings scheduled for {selectedDateStr}.</p>
                        </div>
                      )
                    )}

                    {bookingTab === 'past' && (
                      displayPastBookings.length > 0 ? (
                        displayPastBookings.map((booking) => (
                          <div 
                            key={booking.id} 
                            onClick={() => setViewingBooking(booking)}
                            className="relative rounded-2xl overflow-hidden bg-white shadow-sm border transition-all duration-300 border-slate-200 cursor-pointer hover:shadow-md hover:border-[#002D62]/50 active:scale-[0.98] opacity-90"
                          >
                            <div className="h-40 w-full relative">
                              <img src={booking.image} alt={booking.room} className="w-full h-full object-cover grayscale-[30%]" />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent" />
                              
                              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-slate-700 border border-white/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                                {booking.status}
                              </div>

                              <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                                <h3 className="text-[22px] font-bold mb-1 text-slate-200 tracking-tight leading-tight">{booking.room}</h3>
                                <div className="flex flex-col gap-1.5 mt-2">
                                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 opacity-90">
                                    <Calendar size={13} className="text-slate-200" /> {booking.date} <span className="opacity-50 mx-0.5">•</span> {booking.time.split(' - ')[0]}
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                                    <Users size={12} /> {booking.attendees.length} Attendees
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                          <Calendar className="text-slate-300 mb-3" size={40} />
                          <h3 className="text-slate-700 font-bold text-lg mb-1">No Bookings Found</h3>
                          <p className="text-slate-500 text-sm">There are no past bookings scheduled for {selectedDateStr}.</p>
                        </div>
                      )
                    )}
                  </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PROFILE TAB & SUB-VIEWS */}
          {activeTab === 'profile' && (
            <div className="animate-in fade-in duration-300">
              
              {profileView === 'main' && (
                <div>
                  {/* Sticky Top Bar for Profile */}
                  <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 px-5 py-3.5 flex items-center justify-between shadow-2xs">
                    <div>
                      <h2 className="text-xl font-bold text-[#002D62] tracking-tight">Account & Settings</h2>
                      <p className="text-[11px] font-medium text-slate-400">Manage your BUE student profile</p>
                    </div>
                    <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Active
                    </span>
                  </div>

                  <div className="space-y-6 pt-4 pb-32">
                    <div className="px-5">
                    
                    {/* User Card */}
                    <div className="bg-[#002D62] rounded-3xl p-6 text-white shadow-lg relative overflow-hidden mb-8 mt-2">
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#DA291C]/20 rounded-full blur-2xl"></div>
                      
                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 overflow-hidden">
                          <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl leading-tight">{profileData.name}</h3>
                          <p className="text-blue-100 text-sm font-medium">{profileData.email}</p>
                          <p className="text-white/60 text-xs font-bold mt-1 tracking-wider uppercase">{profileData.id}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settings Options */}
                  <div className="bg-white border-y border-slate-200 px-5 py-2">
                    
                    <button onClick={() => setProfileView('edit')} className="w-full flex items-center justify-between py-4 border-b border-slate-100 active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center">
                          <User size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#002D62] text-[15px]">Personal Information</p>
                          <p className="text-xs text-slate-500 font-medium">Edit name, phone, department</p>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-slate-300" />
                    </button>

                    <button onClick={() => setProfileView('notifications')} className="w-full flex items-center justify-between py-4 border-b border-slate-100 active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center">
                          <Bell size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#002D62] text-[15px]">Notifications</p>
                          <p className="text-xs text-slate-500 font-medium">Manage alerts and emails</p>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-slate-300" />
                    </button>

                    <button onClick={() => setProfileView('groups')} className="w-full flex items-center justify-between py-4 border-b border-slate-100 active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center">
                          <Users size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#002D62] text-[15px]">Manage Groups</p>
                          <p className="text-xs text-slate-500 font-medium">Create, edit, add or remove members</p>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-slate-300" />
                    </button>

                    <button className="w-full flex items-center justify-between py-4 active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-[#002D62] rounded-full flex items-center justify-center">
                          <Shield size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#002D62] text-[15px]">Security</p>
                          <p className="text-xs text-slate-500 font-medium">Password, biometrics</p>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-slate-300" />
                    </button>
                  </div>

                  <div className="bg-white border-y border-slate-200 px-5 py-2 mt-4">
                    <button className="w-full flex items-center justify-between py-4 active:scale-[0.99] transition-transform">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                          <HelpCircle size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-[#002D62] text-[15px]">Help & Support</p>
                          <p className="text-xs text-slate-500 font-medium">FAQs, Contact us</p>
                        </div>
                      </div>
                      <ChevronRightIcon size={20} className="text-slate-300" />
                    </button>
                  </div>

                  <div className="px-5 pt-4">
                    <button 
                      onClick={logout}
                      className="w-full bg-white border border-red-100 text-[#DA291C] font-bold text-[15px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-red-50 active:scale-[0.98] transition-all"
                    >
                      <LogOut size={18} strokeWidth={2.5} /> Log Out
                    </button>
                  </div>
                </div>
              </div>
              )}

              {/* Edit Personal Info Flow */}
              {profileView === 'edit' && (
                <div className="absolute inset-0 bg-slate-50 z-30 flex flex-col animate-in slide-in-from-right-4 duration-300">
                  <div className="p-4 flex items-center gap-4 border-b border-slate-200 bg-white shadow-sm z-10 pt-6">
                    <button onClick={() => setProfileView('main')} className="p-2 bg-slate-50 rounded-full text-[#002D62] hover:bg-slate-100">
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-bold text-[#002D62] text-lg">Edit Profile</h2>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-center mb-8">
                      <div className="relative">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-[#002D62] border-4 border-white shadow-sm overflow-hidden">
                          <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-[#DA291C] text-white p-2 rounded-full shadow-md hover:bg-red-700">
                          <Edit3 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Full Name</label>
                        <input type="text" defaultValue={profileData.name} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#002D62] font-bold outline-none focus:border-[#002D62]" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Phone Number</label>
                        <input type="text" defaultValue={profileData.phone} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#002D62] font-bold outline-none focus:border-[#002D62]" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Department</label>
                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#002D62] font-bold outline-none focus:border-[#002D62] appearance-none">
                          <option>Computer Science</option>
                          <option>Engineering</option>
                          <option>Business Admin</option>
                          <option>Dentistry</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 mb-1 block">Student ID (Read Only)</label>
                        <input type="text" defaultValue={profileData.id} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-slate-500 font-bold outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgb(0,0,0,0.02)] pb-8">
                    <button onClick={saveProfile} className="w-full bg-[#002D62] text-white font-bold text-lg py-4 rounded-xl shadow-md hover:bg-[#002D62]/90 transition-all active:scale-95">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Flow */}
              {profileView === 'notifications' && (
                <div className="absolute inset-0 bg-slate-50 z-30 flex flex-col animate-in slide-in-from-right-4 duration-300">
                  <div className="p-4 flex items-center gap-4 border-b border-slate-200 bg-white shadow-sm z-10 pt-6">
                    <button onClick={() => setProfileView('main')} className="p-2 bg-slate-50 rounded-full text-[#002D62] hover:bg-slate-100">
                      <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-bold text-[#002D62] text-lg">Notification Settings</h2>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <h3 className="font-bold text-[#002D62] text-[15px]">Push Notifications</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Alerts on your device</p>
                      </div>
                      <div className="w-12 h-6 bg-[#DA291C] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <h3 className="font-bold text-[#002D62] text-[15px]">Email Reminders</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Booking confirmations & updates</p>
                      </div>
                      <div className="w-12 h-6 bg-[#DA291C] rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between shadow-sm">
                      <div>
                        <h3 className="font-bold text-[#002D62] text-[15px]">Promotional Offers</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">News about new campus facilities</p>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgb(0,0,0,0.02)] pb-8">
                    <button onClick={saveProfile} className="w-full bg-[#002D62] text-white font-bold text-lg py-4 rounded-xl shadow-md hover:bg-[#002D62]/90 transition-all active:scale-95">
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Manage Groups Sub-View */}
              {profileView === 'groups' && (
                <div className="absolute inset-0 bg-slate-50 z-30 flex flex-col animate-in slide-in-from-right-4 duration-300">
                  <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm z-10 pt-6">
                    <div className="flex items-center gap-3">
                      <button onClick={() => { setProfileView('main'); setEditingGroupName(null); }} className="p-2 bg-slate-50 rounded-full text-[#002D62] hover:bg-slate-100">
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <h2 className="font-bold text-[#002D62] text-lg">Manage Groups</h2>
                        <p className="text-[11px] text-slate-500 font-medium">{customGroups.length} Active Groups</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowCreateGroupModal(true)}
                      className="bg-[#DA291C] hover:bg-[#b82216] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                    >
                      <Plus size={14} /> New Group
                    </button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-28">
                    {customGroups.map((grp) => {
                      const groupMembers = bueUsers.filter(u => u.group === grp);
                      return (
                        <div 
                          key={grp} 
                          onClick={() => {
                            setEditingGroupName(grp);
                            setGroupPeopleSearch('');
                            setGroupPeopleFilter('all');
                            setProfileView('group-detail');
                          }}
                          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm relative overflow-hidden cursor-pointer hover:border-slate-300 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#002D62] font-black flex items-center justify-center text-sm border border-blue-100 group-hover:bg-[#002D62] group-hover:text-white transition-colors">
                                <Users size={16} />
                              </div>
                              <div>
                                <h3 className="font-bold text-[#002D62] text-base leading-tight">{grp}</h3>
                                <span className="text-xs font-semibold text-slate-400">{groupMembers.length} {groupMembers.length === 1 ? 'member' : 'members'}</span>
                              </div>
                            </div>

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setCustomGroups(prev => prev.filter(g => g !== grp));
                                setToastMessage(`Deleted group "${grp}"`);
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 3000);
                              }}
                              className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete Group"
                            >
                              <X size={16} />
                            </button>
                          </div>

                          {/* Member Avatars Stack */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                            <div className="flex items-center -space-x-2 overflow-hidden py-1">
                              {groupMembers.length > 0 ? (
                                groupMembers.slice(0, 5).map((m, idx) => (
                                  <img 
                                    key={idx} 
                                    src={m.avatar} 
                                    alt={m.name} 
                                    title={m.name}
                                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-xs" 
                                  />
                                ))
                              ) : (
                                <span className="text-xs text-slate-400 italic">No members assigned yet</span>
                              )}
                              {groupMembers.length > 5 && (
                                <div className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white text-slate-600 text-[10px] font-bold flex items-center justify-center">
                                  +{groupMembers.length - 5}
                                </div>
                              )}
                            </div>

                            <div className="text-xs font-bold text-[#002D62] bg-slate-100 group-hover:bg-[#002D62] group-hover:text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                              Manage <ChevronRightIcon size={14} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Create Group Modal */}
                  {showCreateGroupModal && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-in fade-in">
                      <div className="bg-white w-full rounded-2xl p-5 shadow-2xl border border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-[#002D62] text-base">Create New Group</h3>
                          <button onClick={() => setShowCreateGroupModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                            <X size={18} />
                          </button>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Group name (e.g. AI Study Circle)"
                          value={newGroupNameInput}
                          onChange={(e) => setNewGroupNameInput(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#002D62] font-medium"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setShowCreateGroupModal(false)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => {
                              if (newGroupNameInput.trim()) {
                                setCustomGroups([...customGroups, newGroupNameInput.trim()]);
                                setToastMessage(`Group "${newGroupNameInput.trim()}" created!`);
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 3000);
                                setNewGroupNameInput('');
                                setShowCreateGroupModal(false);
                              }
                            }}
                            className="flex-1 py-2.5 rounded-xl bg-[#002D62] text-white font-bold text-xs hover:bg-[#002D62]/90 shadow-md"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Dedicated Group Detail / Edit Members Page */}
              {profileView === 'group-detail' && editingGroupName && (
                <div className="absolute inset-0 bg-slate-50 z-30 flex flex-col animate-in slide-in-from-right-4 duration-300">
                  {/* Top Navigation Header */}
                  <div className="p-4 flex items-center justify-between border-b border-slate-200 bg-white shadow-sm z-10 pt-6">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setProfileView('groups')} className="p-2 bg-slate-50 rounded-full text-[#002D62] hover:bg-slate-100 transition-colors">
                        <ArrowLeft size={20} />
                      </button>
                      <div>
                        <h2 className="font-bold text-[#002D62] text-lg leading-tight">{editingGroupName}</h2>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {bueUsers.filter(u => u.group === editingGroupName).length} Active Members
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setCustomGroups(prev => prev.filter(g => g !== editingGroupName));
                        setToastMessage(`Deleted group "${editingGroupName}"`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                        setProfileView('groups');
                      }}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors"
                      title="Delete Group"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Search Bar & Filter Button */}
                  <div className="p-4 bg-white border-b border-slate-100 space-y-2.5">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text"
                          placeholder="Search colleagues by name, role..."
                          value={groupPeopleSearch}
                          onChange={(e) => setGroupPeopleSearch(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-xs font-medium focus:outline-none focus:border-[#002D62]"
                        />
                        {groupPeopleSearch && (
                          <button onClick={() => setGroupPeopleSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                            <X size={14} />
                          </button>
                        )}
                      </div>

                      {/* Filter Button */}
                      <button
                        onClick={() => setShowGroupDetailFilters(!showGroupDetailFilters)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 border ${
                          showGroupDetailFilters || groupRoleFilter !== 'All Roles'
                            ? 'bg-[#002D62] text-white border-[#002D62] shadow-xs'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        <SlidersHorizontal size={13} />
                        <span>Filter</span>
                        {groupRoleFilter !== 'All Roles' && (
                          <span className="w-2 h-2 rounded-full bg-[#DA291C]" />
                        )}
                      </button>
                    </div>

                    {/* Filter Tabs (All / In Group / Available) */}
                    <div className="flex gap-2">
                      {[
                        { id: 'all', label: `All (${bueUsers.length})` },
                        { id: 'members', label: `In Group (${bueUsers.filter(u => u.group === editingGroupName).length})` },
                        { id: 'available', label: `Available (${bueUsers.filter(u => u.group !== editingGroupName).length})` }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setGroupPeopleFilter(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            groupPeopleFilter === tab.id
                              ? 'bg-[#002D62] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Collapsible Profession / Role Filters */}
                    {showGroupDetailFilters && (
                      <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                        <div className="flex justify-between items-center px-0.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Filter by Profession / Role</span>
                          {groupRoleFilter !== 'All Roles' && (
                            <button onClick={() => setGroupRoleFilter('All Roles')} className="text-[10px] text-[#DA291C] font-bold">Reset</button>
                          )}
                        </div>
                        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                          {professionFilterOptions.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => setGroupRoleFilter(opt.id)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
                                groupRoleFilter === opt.id
                                  ? 'bg-[#DA291C] text-white shadow-xs scale-[1.02]'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Colleagues List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2.5 pb-28">
                    {bueUsers
                      .filter(u => {
                        const matchesSearch = u.name.toLowerCase().includes(groupPeopleSearch.toLowerCase()) || u.role.toLowerCase().includes(groupPeopleSearch.toLowerCase());
                        const matchesRole = matchUserRole(u.role, (u as any).category, groupRoleFilter);
                        const isMember = u.group === editingGroupName;
                        if (groupPeopleFilter === 'members') return matchesSearch && matchesRole && isMember;
                        if (groupPeopleFilter === 'available') return matchesSearch && matchesRole && !isMember;
                        return matchesSearch && matchesRole;
                      })
                      .map((u) => {
                        const isMember = u.group === editingGroupName;
                        return (
                          <div 
                            key={u.id}
                            onClick={() => {
                              setBueUsers(prev => prev.map(usr => {
                                if (usr.id === u.id) {
                                  return { ...usr, group: isMember ? 'General' : editingGroupName };
                                }
                                return usr;
                              }));
                            }}
                            className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer border transition-all ${
                              isMember 
                                ? 'bg-blue-50/80 border-blue-200 shadow-xs' 
                                : 'bg-white border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                              <div>
                                <p className="font-bold text-[#002D62] text-sm leading-tight">{u.name}</p>
                                <p className="text-xs text-slate-400 font-medium">{u.role}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {isMember ? (
                                <span className="text-xs font-bold text-[#002D62] bg-white border border-blue-200 px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5">
                                  <Check size={14} className="text-blue-600" strokeWidth={3} /> In Group
                                </span>
                              ) : (
                                <span className="text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors flex items-center gap-1">
                                  <Plus size={14} /> Add
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Sticky Bottom Save Bar */}
                  <div className="p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgb(0,0,0,0.02)] z-10 pb-6">
                    <button 
                      onClick={() => {
                        setToastMessage(`Saved changes for ${editingGroupName}!`);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                        setProfileView('groups');
                      }}
                      className="w-full bg-[#002D62] hover:bg-[#002D62]/90 text-white font-bold py-3 rounded-xl text-sm shadow-md active:scale-95 transition-all"
                    >
                      Save & Return ({bueUsers.filter(u => u.group === editingGroupName).length} Members)
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 w-full z-20 bg-[#002D62] rounded-t-2xl pb-1 shadow-[0_-10px_40px_rgba(0,45,98,0.2)]">
          <nav className="flex justify-between items-center px-6 pt-3 pb-2">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'search', icon: SearchIcon, label: 'Search' },
              { id: 'bookings', icon: Calendar, label: 'Bookings' },
              { id: 'favorites', icon: Heart, label: 'Saved' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-center transition-all duration-300 ${
                  activeTab === item.id 
                  ? 'text-white bg-[#DA291C] px-4 py-2 rounded-2xl gap-2 shadow-md' 
                  : 'text-white/50 hover:text-white/80 p-2'
                }`}
              >
                <item.icon size={22} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                {activeTab === item.id && (
                  <span className="text-[13px] font-bold tracking-wide">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Success Toast Overlay */}
        {showToast && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-[400px] bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 text-white px-4 py-3 rounded-2xl flex items-center gap-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-8 duration-500 hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => setShowToast(false)}>
            <div className="bg-emerald-500/20 text-emerald-400 rounded-full p-2 shrink-0">
              <Bell size={16} className="animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Notification</span>
              <span className="text-[13px] font-semibold leading-tight">{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
