import React, { useState, useEffect } from 'react';
import {
  Box, CssBaseline, Drawer, Toolbar, Typography, Grid, Paper,
  CircularProgress, LinearProgress, List, ListItem, ListItemIcon, ListItemText,
  IconButton, useTheme, useMediaQuery, Modal, Fade, AppBar, Toolbar as MuiToolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SpaIcon from '@mui/icons-material/Spa';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Pie, PieChart, Cell, LabelList, Sector
} from 'recharts';

const sidebarWidth = 220;
const appBarHeight = 64;
const sidebarItems = [
  { text: 'Dashboard', icon: <SpaIcon sx={{ color: "#ffeb3b" }} />, path: '/' },
  { text: 'Gamification', icon: <SportsEsportsIcon sx={{ color: "#ffeb3b" }} />, path: '/gamification' },
  { text: 'Tips', icon: <MailIcon sx={{ color: "#ffeb3b" }} />, path: '/tips' },
  { text: 'Reports', icon: <CloudIcon sx={{ color: "#ffeb3b" }} />, path: '/reports' },
  { text: 'About Us', icon: <InfoIcon sx={{ color: "#ffeb3b" }} />, path: '/about' },
];

const COLORS = ['#ffeb3b', '#00c49f', '#ffbb28', '#ff7300', '#b300b3', '#3aaafa'];

const CATEGORY_DETAILS = {
  Email: {
    title: "Email",
    info: "Carbon emissions from sending, receiving, and storing emails. Lowering attachment size, deleting old emails, and unsubscribing from lists can reduce this.",
  },
  "Online Storage": {
    title: "Online Storage",
    info: "Emissions generated from storing and syncing files on cloud services like Google Drive or Dropbox. Deleting unused files can help lower your impact.",
  },
  "Video Streaming": {
    title: "Video Streaming",
    info: "Streaming video is resource intensive due to server operations and data transfer. Lowering streaming quality and time spent can help reduce this emission.",
  },
};

function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          background: "#23272b",
          borderRight: "1px solid #444",
        }
      }}
      ModalProps={{ keepMounted: true }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto', mt: 2 }}>
        <List>
          {sidebarItems.map(({ text, icon, path }) => (
            <ListItem
              button
              key={text}
              sx={{ mb: 1 }}
              onClick={() => {
                navigate(path);
                onClose();
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: "#ffeb3b" }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

function GamificationLevels() {
  const levels = [
    {
      name: 'Beginner',
      description: 'You are just starting. Your digital carbon footprint is high, but every small step counts!',
      color: '#FF6F61',
    },
    {
      name: 'Intermediate',
      description: 'Good progress! You are reducing your digital emissions, keep up the momentum.',
      color: '#FFA726',
    },
    {
      name: 'Advanced',
      description: 'Great job! Your actions are significantly helping reduce environmental impact.',
      color: '#66BB6A',
    },
    {
      name: 'Expert',
      description: 'Outstanding! You have optimized your digital habits for minimal carbon footprint.',
      color: '#42A5F5',
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ color: '#ffeb3b', textAlign: 'center', fontWeight: '900' }}>
        Gamification Levels Explained
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {levels.map(({ name, description, color }) => (
          <Grid item xs={12} sm={6} md={3} key={name}>
            <Paper
              elevation={6}
              sx={{
                background: 'rgba(33, 33, 38, 0.9)',
                color: '#fff',
                minHeight: 180,
                borderLeft: `6px solid ${color}`,
                boxShadow: `0 0 20px 0 ${color}`,
                borderRadius: 3,
                '&:hover': {
                  boxShadow: `0 0 30px 0 ${color}`,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography variant="h5" sx={{ color, mb: 1 }}>
                  {name}
                </Typography>
                <Typography variant="body1">{description}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function CardContainer({ children, ...props }) {
  return (
    <Paper elevation={0}
      sx={{
        p: 3,
        background: 'rgba(30, 31, 34, 0.6)',
        borderRadius: 4,
        boxShadow: '0 2px 24px 0 rgba(0,0,0,0.3)',
        color: "#ffeb3b",
        backdropFilter: "blur(2.5px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...props.sx
      }}>
      {children}
    </Paper>
  );
}


function DailyBreakdown() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/daily_breakdown')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <CardContainer>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>DAILY BREAKDOWN</Typography>
        <Box>Loading...</Box>
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>DAILY BREAKDOWN</Typography>
      <Box>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <MailIcon fontSize="small" sx={{ mr: 1 }} /> Emails Sent: {data.emails_sent}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          <StorageIcon fontSize="small" sx={{ mr: 1 }} /> Browsing Hours: {data.browsing_hours} hrs
        </Typography>
        <Typography variant="body2">
          <CloudIcon fontSize="small" sx={{ mr: 1 }} /> Cloud Storage: {data.cloud_storage} GB
        </Typography>
      </Box>
    </CardContainer>
  );
}

function TotalCO2() {
  const [total, setTotal] = React.useState(null);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/total_co2')
      .then(res => res.json())
      .then(resp => setTotal(resp.total));
  }, []);

  return (
    <CardContainer>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>TOTAL CO₂</Typography>
      <CircularProgress
        variant="determinate"
        value={total !== null ? Math.min(100, total / 10) : 0} // Placeholder: adjust scaling for progress
        size={100}
        thickness={5}
        sx={{ color: "#81ff89", mb: 2, mt: 1 }}
      />
      <Typography variant="caption" sx={{ mb: 1 }}>today • week • month</Typography>
      <Typography variant="h3" sx={{ mt: 1, fontWeight: 800 }}>
        {total !== null ? `${total}g` : '--'}
      </Typography>
    </CardContainer>
  );
}





// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   LinearProgress,
//   CircularProgress,
//   Modal,
//   Fade,
//   IconButton
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// // Assume CATEGORY_DETAILS is defined already in your App.js or imported.

function Gamification() {
  const [score, setScore] = useState(null);
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/gamification')
      .then(res => res.json())
      .then(data => {
        setScore(data.score);
        setLevel(data.level);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Assuming you may want to open details modal on some action; for now, clicking score opens modal showing some info.
  const handleOpenModal = () => {
    setSelectedCategory({ name: 'Gamification', description: 'Your current gamification status' });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setModalOpen(false);
  };

  if (loading) {
    return (
      <CardContainer>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>GAMIFICATION</Typography>
        <CircularProgress sx={{ color: '#ffeb3b' }} />
      </CardContainer>
    );
  }

  return (
    <>
      <CardContainer>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>GAMIFICATION</Typography>
        <Box display="flex" alignItems="center" mb={1}>
          <Typography
            variant="h4"
            sx={{ mr: 2, fontWeight: 700, cursor: 'pointer' }}
            onClick={handleOpenModal}
            title="Click for details"
          >
            {score !== null ? score.toFixed(2) : '--'}
          </Typography>
          <Typography sx={{ fontWeight: 700, color: '#00c97b' }}>
            {level || '--'}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={score !== null ? Math.min(score, 100) : 0}
          sx={{
            height: 10,
            borderRadius: 5,
            mb: 1,
            backgroundColor: '#252a2f',
            "& .MuiLinearProgress-bar": {
              backgroundColor: '#ffeb3b',
            },
          }}
        />
        <Typography>Eco-achiever! Keep reducing your footprint.</Typography>
      </CardContainer>

      <DetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        category={selectedCategory}
        value={score !== null ? score.toFixed(2) : 'N/A'}
      />
    </>
  );
}

function DetailModal({ open, onClose, category, value }) {
  if (!category) return null;
  const details = CATEGORY_DETAILS[category.name] || { title: category.name, info: "No information available." };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.42)' } }}
    >
      <Fade in={open}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: '#222',
          border: '2px solid #ffeb3b',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 320,
          maxWidth: 390,
          color: '#ffeb3b',
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
              {details.title}
            </Typography>
            <IconButton onClick={onClose} color="inherit" size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {details.info || category.description || 'No additional information.'}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#00c97b', fontWeight: 700 }}>
            Current Score: {value}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}

function CategoryChart() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/category/pie')
      .then(res => res.json())
      .then(data => {
        setCategoryData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getOuterRadius = (index) =>
    index === activeIndex ? 68 : 48;

  const handlePieEnter = (_, index) => setActiveIndex(index);
  const handlePieLeave = () => setActiveIndex(null);
  const handlePieClick = (data) => {
    setSelectedCategory(data);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <CardContainer sx={{ height: 320, minWidth: 500 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Category Emissions (Quantity)</Typography>
      <Box sx={{ width: "100%", height: '280px', flexGrow: 1, position: "relative" }}>
        {loading ? (
          <CircularProgress color="inherit" size={40} />
        ) : (
          <>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={48}
                  activeIndex={activeIndex}
                  activeShape={props => (
                    <g>
                      <text
                        x={props.cx}
                        y={props.cy - getOuterRadius(props.activeIndex) - 14}
                        textAnchor="middle"
                        fill="#ffeb3b"
                        fontSize={18}
                        fontWeight="900"
                      >
                        {props.payload.name}
                      </text>
                      <Sector
                        {...props}
                        outerRadius={getOuterRadius(props.activeIndex)}
                        fill={COLORS[props.index % COLORS.length]}
                      />
                    </g>
                  )}
                  onMouseEnter={handlePieEnter}
                  onMouseLeave={handlePieLeave}
                  onClick={handlePieClick}
                  paddingAngle={1}
                  isAnimationActive
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      cursor="pointer"
                    />
                  ))}
                  <LabelList dataKey="name" position="outside" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <Typography
              variant="caption"
              sx={{ color: "#ffeb3b", mt: 2, fontWeight: 600, textAlign: 'center' }}
            >
              Click on each section to know more
            </Typography>
            <DetailModal
              open={modalOpen}
              onClose={handleModalClose}
              category={selectedCategory}
              value={selectedCategory ? selectedCategory.value : ''}
            />
          </>
        )}
      </Box>
    </CardContainer>
  );
}

function WeeklyEmissionsChart() {
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/weekly/total')
      .then(res => res.json())
      .then(data => {
        setWeeklyData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <CardContainer sx={{ height: 320, minWidth: 420 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>Total Carbon Emissions (Weekly)</Typography>
      <Box sx={{ width: "100%", height: '220px', flexGrow: 1, position: "relative" }}>
        {loading ? (
          <CircularProgress color="inherit" size={40} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barSize={36}>
              <XAxis dataKey="day" tick={{ fill: "#ffeb3b", fontSize: 16, fontWeight: 700 }} axisLine={false} />
              <YAxis tick={{ fill: "#ffeb3b" }} axisLine={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#ffeb3b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Box>
      <Typography variant="caption" sx={{ fontWeight: 600, mt: 1 }}>
        Each bar shows your total carbon emission per day (gCO₂).
      </Typography>
    </CardContainer>
  );
}

function DashboardMain() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        pt: { xs: 2, md: 6 },
        pb: { xs: 2, md: 4 },
        px: { xs: 1, md: 4 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Toolbar />
      <Typography variant="h3" sx={{ color: '#ffeb3b', fontWeight: 900, letterSpacing: 1, mb: 3, ml: 1 }}>
        Carbon Scope
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          flexGrow: 1,
          height: { xs: 'auto', md: `calc(100vh - ${appBarHeight + 56}px)` },
        }}
      >
        <Grid item xs={12} md={4} sx={{ height: { md: '45%' } }}>
          <DailyBreakdown />
        </Grid>
        <Grid item xs={12} md={3} sx={{ height: { md: '45%' } }}>
          <TotalCO2 />
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: { md: '45%' } }}>
          <Gamification />
        </Grid>
        <Grid item xs={12} md={6} sx={{ height: { md: '45%' } }}>
          <CategoryChart />
        </Grid>
        <Grid item xs={12} md={12} sx={{ height: { md: '40%' }, mt: 3 }}>
          <WeeklyEmissionsChart />
        </Grid>
      </Grid>
    </Box>
  );
}

function Landing({ opacity }) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        opacity,
        transition: 'opacity 0.5s ease',
        color: '#ffeb3b',
        fontWeight: 900,
        fontSize: { xs: '5rem', md: '10rem' },
        letterSpacing: 2,
        zIndex: 10,
        position: 'relative',
        backgroundColor: 'transparent',
      }}
    >
      Carbon Scope
    </Box>
  );
}

function AboutUs() {
  return (
    <CardContainer sx={{ minHeight: '100vh', justifyContent: 'flex-start', pt: 6 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
        What CarbonScope Does
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-line', fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 4, color: "#f0f0ebff" }}>
        {`CarbonScope is your personal digital eco-pilot, designed to reveal the invisible environmental impact of your online world. We connect directly to your digital life—from the number of emails you send to the hours you spend browsing and streaming—and translate these actions into a clear, understandable carbon footprint. With an engaging, gamified dashboard, we transform complex data into a fun, visual journey. CarbonScope provides instant insights into where your digital emissions are coming from, giving you the knowledge and power to make smarter, greener choices. It’s the ultimate tool to track, understand, and visualize your progress on the path to a more sustainable digital life.`}
      </Typography>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
        Importance Of CarbonScope
      </Typography>
      <Typography sx={{ whiteSpace: 'pre-line', fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 4, color: "#f0f0ebff"  }}>
        {`While we focus on physical carbon emissions like those from cars and factories, the digital world's footprint is a hidden giant. The servers, data centers, and networks that power our lives consume vast amounts of energy, generating a significant and growing amount of CO2. CarbonScope tackles this invisible problem head-on, making the abstract concept of digital pollution tangible and actionable for everyone. By empowering individuals to see and reduce their own digital carbon footprint, we're not just creating a cool app—we're fostering a new wave of environmental awareness. Our mission is to show that a more sustainable future starts with a single click, and that together, we can make a massive, positive impact on our planet, one byte at a time.`}
      </Typography>
    </CardContainer>
  )
}

function Tips() {
  const tips = [
    "Email Smart: Bundle your messages to reduce emissions.",
    "Tab Cleanup: Close unused tabs to save energy.",
    "Quality Down: Use 720p streaming to lower carbon footprint.",
    "Cloud Cleanup: Delete old files from your cloud storage.",
    "Search Carefully: Think before clicking to reduce data use.",
    "Turn Off Notifications: Reduce device energy use.",
    "Clear Cache Regularly: Maintain device performance.",
    "Use Power Saving Modes: Put devices to sleep when idle.",
    "Optimize WiFi: Strong connections reduce energy waste.",
    "Download Music: Listen offline to save data.",
    "Delete Duplicate Photos: Reduce cloud storage load.",
    "Be Concise: Shorter messages save resources.",
    "Update Manually: Avoid automatic updates to save energy.",
    "Take Gaming Breaks: Limit gaming time to reduce power draw.",
    "Use Ad Blockers: Block ads to reduce data load.",
  ];

  return (
    <Box sx={{ minHeight: '100vh', pt: 6 }}>
      <Typography variant="h4" sx={{
        mb: 4,
        fontWeight: 900,
        letterSpacing: 1,
        color: '#ffeb3b',
        textAlign: "center",
        textShadow: '0px 4px 16px #0009',
      }}>
        Smart Suggestions
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {tips.map((tip, idx) => (
          <Grid item xs={12} sm={8} md={6} key={idx}>
            <Paper
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                background: 'rgba(33,33,38,0.92)',
                color: '#fff',
                fontSize: '1.13rem',
                fontWeight: 500,
                boxShadow: "0 2px 20px 0 rgba(0,0,0,0.18)",
                borderLeft: '6px solid #ffeb3b',
              }}
            >
              {tip}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}



function AppContent() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [landingOpacity, setLandingOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const fadeDistance = window.innerHeight * 0.7;
      let opacity = 1 - scrollTop / fadeDistance;
      if (opacity < 0) opacity = 0;
      setLandingOpacity(opacity);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex', minHeight: "100vh", position: "relative", flexDirection: "column" }}>
      <CssBaseline />
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          minWidth: "100vw",
          minHeight: "100vh",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/ideathon.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <AppBar position="fixed" sx={{ backgroundColor: '#23272b', zIndex: 20 }}>
        <MuiToolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
            aria-label="open sidebar"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: '#ffeb3b', fontWeight: 700 }}>
            Carbon Scope
          </Typography>
        </MuiToolbar>
      </AppBar>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Landing opacity={landingOpacity} />

      <Box
        sx={{
          mt: "100vh",
          flexGrow: 1,
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          pb: { xs: 2, md: 4 },
          px: { xs: 1, md: 4 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <Toolbar /> {/* offset for fixed AppBar */}

        <Routes>
          <Route path="/" element={<DashboardMain />} />
          <Route path="/gamification" element={<GamificationLevels />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/reports" element={<Box sx={{ p: 3, color: '#ffeb3b' }}>Reports Coming Soon</Box>} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}










// import React, { useState, useEffect } from 'react';
// import {
//   Box, CssBaseline, Drawer, Toolbar, Typography, Grid, Paper,
//   CircularProgress, LinearProgress, List, ListItem, ListItemIcon, ListItemText,
//   IconButton, useTheme, useMediaQuery, Modal, Fade, AppBar, Toolbar as MuiToolbar
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import MailIcon from '@mui/icons-material/Mail';
// import CloudIcon from '@mui/icons-material/Cloud';
// import StorageIcon from '@mui/icons-material/Storage';
// import SpaIcon from '@mui/icons-material/Spa';
// import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
// import InfoIcon from '@mui/icons-material/Info';
// import CloseIcon from '@mui/icons-material/Close';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useNavigate
// } from 'react-router-dom';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   Pie, PieChart, Cell, LabelList, Sector
// } from 'recharts';

// const sidebarWidth = 220;
// const appBarHeight = 64;
// const sidebarItems = [
//   { text: 'Dashboard', icon: <SpaIcon sx={{ color: "#ffeb3b" }} />, path: '/' },
//   { text: 'Gamification', icon: <SportsEsportsIcon sx={{ color: "#ffeb3b" }} />, path: '/gamification' },
//   { text: 'Tips', icon: <MailIcon sx={{ color: "#ffeb3b" }} />, path: '/tips' },
//   { text: 'Reports', icon: <CloudIcon sx={{ color: "#ffeb3b" }} />, path: '/reports' },
//   { text: 'About Us', icon: <InfoIcon sx={{ color: "#ffeb3b" }} />, path: '/about' },
// ];

// const COLORS = ['#ffeb3b', '#00c49f', '#ffbb28', '#ff7300', '#b300b3', '#3aaafa'];

// const CATEGORY_DETAILS = {
//   Email: {
//     title: "Email",
//     info: "Carbon emissions from sending, receiving, and storing emails. Lowering attachment size, deleting old emails, and unsubscribing from lists can reduce this.",
//   },
//   "Online Storage": {
//     title: "Online Storage",
//     info: "Emissions generated from storing and syncing files on cloud services like Google Drive or Dropbox. Deleting unused files can help lower your impact.",
//   },
//   "Video Streaming": {
//     title: "Video Streaming",
//     info: "Streaming video is resource intensive due to server operations and data transfer. Lowering streaming quality and time spent can help reduce this emission.",
//   },
// };

// function Sidebar({ open, onClose }) {
//   const navigate = useNavigate();

//   return (
//     <Drawer
//       variant="temporary"
//       open={open}
//       onClose={onClose}
//       sx={{
//         width: sidebarWidth,
//         flexShrink: 0,
//         '& .MuiDrawer-paper': {
//           width: sidebarWidth,
//           boxSizing: 'border-box',
//           background: "#23272b",
//           borderRight: "1px solid #444",
//         }
//       }}
//       ModalProps={{ keepMounted: true }}
//     >
//       <Toolbar />
//       <Box sx={{ overflow: 'auto', mt: 2 }}>
//         <List>
//           {sidebarItems.map(({ text, icon, path }) => (
//             <ListItem
//               button
//               key={text}
//               sx={{ mb: 1 }}
//               onClick={() => {
//                 navigate(path);
//                 onClose();
//               }}
//             >
//               <ListItemIcon>{icon}</ListItemIcon>
//               <ListItemText primary={text} sx={{ color: "#ffeb3b" }} />
//             </ListItem>
//           ))}
//         </List>
//       </Box>
//     </Drawer>
//   );
// }

// function CardContainer({ children, ...props }) {
//   return (
//     <Paper elevation={0}
//       sx={{
//         p: 3,
//         background: 'rgba(30, 31, 34, 0.6)',
//         borderRadius: 4,
//         boxShadow: '0 2px 24px 0 rgba(0,0,0,0.3)',
//         color: "#ffeb3b",
//         backdropFilter: "blur(2.5px)",
//         height: "100%",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         ...props.sx
//       }}>
//       {children}
//     </Paper>
//   );
// }


// function DailyBreakdown() {
//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
//     fetch('http://localhost:5000/api/daily_breakdown')
//       .then(res => res.json())
//       .then(setData);
//   }, []);

//   if (!data) {
//     return (
//       <CardContainer>
//         <Typography variant="subtitle1" sx={{ mb: 1 }}>DAILY BREAKDOWN</Typography>
//         <Box>Loading...</Box>
//       </CardContainer>
//     );
//   }

//   return (
//     <CardContainer>
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>DAILY BREAKDOWN</Typography>
//       <Box>
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           <MailIcon fontSize="small" sx={{ mr: 1 }} /> Emails Sent: {data.emails_sent}
//         </Typography>
//         <Typography variant="body2" sx={{ mb: 0.5 }}>
//           <StorageIcon fontSize="small" sx={{ mr: 1 }} /> Browsing Hours: {data.browsing_hours} hrs
//         </Typography>
//         <Typography variant="body2">
//           <CloudIcon fontSize="small" sx={{ mr: 1 }} /> Cloud Storage: {data.cloud_storage} GB
//         </Typography>
//       </Box>
//     </CardContainer>
//   );
// }

// function TotalCO2() {
//   const [total, setTotal] = React.useState(null);

//   React.useEffect(() => {
//     fetch('http://localhost:5000/api/total_co2')
//       .then(res => res.json())
//       .then(resp => setTotal(resp.total));
//   }, []);

//   return (
//     <CardContainer>
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>TOTAL CO₂</Typography>
//       <CircularProgress
//         variant="determinate"
//         value={total !== null ? Math.min(100, total / 10) : 0} // Placeholder: adjust scaling for progress
//         size={100}
//         thickness={5}
//         sx={{ color: "#81ff89", mb: 2, mt: 1 }}
//       />
//       <Typography variant="caption" sx={{ mb: 1 }}>today • week • month</Typography>
//       <Typography variant="h3" sx={{ mt: 1, fontWeight: 800 }}>
//         {total !== null ? `${total}g` : '--'}
//       </Typography>
//     </CardContainer>
//   );
// }





// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box,
// //   Typography,
// //   LinearProgress,
// //   CircularProgress,
// //   Modal,
// //   Fade,
// //   IconButton
// // } from '@mui/material';
// // import CloseIcon from '@mui/icons-material/Close';

// // // Assume CATEGORY_DETAILS is defined already in your App.js or imported.

// function Gamification() {
//   const [score, setScore] = useState(null);
//   const [level, setLevel] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/gamification')
//       .then(res => res.json())
//       .then(data => {
//         setScore(data.score);
//         setLevel(data.level);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   // Assuming you may want to open details modal on some action; for now, clicking score opens modal showing some info.
//   const handleOpenModal = () => {
//     setSelectedCategory({ name: 'Gamification', description: 'Your current gamification status' });
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedCategory(null);
//     setModalOpen(false);
//   };

//   if (loading) {
//     return (
//       <CardContainer>
//         <Typography variant="subtitle1" sx={{ mb: 2 }}>GAMIFICATION</Typography>
//         <CircularProgress sx={{ color: '#ffeb3b' }} />
//       </CardContainer>
//     );
//   }

//   return (
//     <>
//       <CardContainer>
//         <Typography variant="subtitle1" sx={{ mb: 1 }}>GAMIFICATION</Typography>
//         <Box display="flex" alignItems="center" mb={1}>
//           <Typography
//             variant="h4"
//             sx={{ mr: 2, fontWeight: 700, cursor: 'pointer' }}
//             onClick={handleOpenModal}
//             title="Click for details"
//           >
//             {score !== null ? score.toFixed(2) : '--'}
//           </Typography>
//           <Typography sx={{ fontWeight: 700, color: '#00c97b' }}>
//             {level || '--'}
//           </Typography>
//         </Box>
//         <LinearProgress
//           variant="determinate"
//           value={score !== null ? Math.min(score, 100) : 0}
//           sx={{
//             height: 10,
//             borderRadius: 5,
//             mb: 1,
//             backgroundColor: '#252a2f',
//             "& .MuiLinearProgress-bar": {
//               backgroundColor: '#ffeb3b',
//             },
//           }}
//         />
//         <Typography>Eco-achiever! Keep reducing your footprint.</Typography>
//       </CardContainer>

//       <DetailModal
//         open={modalOpen}
//         onClose={handleCloseModal}
//         category={selectedCategory}
//         value={score !== null ? score.toFixed(2) : 'N/A'}
//       />
//     </>
//   );
// }

// function DetailModal({ open, onClose, category, value }) {
//   if (!category) return null;
//   const details = CATEGORY_DETAILS[category.name] || { title: category.name, info: "No information available." };

//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropProps={{ style: { backgroundColor: 'rgba(0,0,0,0.42)' } }}
//     >
//       <Fade in={open}>
//         <Box sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           bgcolor: '#222',
//           border: '2px solid #ffeb3b',
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//           minWidth: 320,
//           maxWidth: 390,
//           color: '#ffeb3b',
//         }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6" sx={{ mb: 1, fontWeight: 800 }}>
//               {details.title}
//             </Typography>
//             <IconButton onClick={onClose} color="inherit" size="small">
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Typography variant="body2" sx={{ mb: 2 }}>
//             {details.info || category.description || 'No additional information.'}
//           </Typography>
//           <Typography variant="subtitle1" sx={{ color: '#00c97b', fontWeight: 700 }}>
//             Current Score: {value}
//           </Typography>
//         </Box>
//       </Fade>
//     </Modal>
//   );
// }

// function CategoryChart() {
//   const [categoryData, setCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/category/pie')
//       .then(res => res.json())
//       .then(data => {
//         setCategoryData(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   const getOuterRadius = (index) =>
//     index === activeIndex ? 68 : 48;

//   const handlePieEnter = (_, index) => setActiveIndex(index);
//   const handlePieLeave = () => setActiveIndex(null);
//   const handlePieClick = (data) => {
//     setSelectedCategory(data);
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//     setSelectedCategory(null);
//   };

//   return (
//     <CardContainer sx={{ height: 320, minWidth: 500 }}>
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>Category Emissions (Quantity)</Typography>
//       <Box sx={{ width: "100%", height: '280px', flexGrow: 1, position: "relative" }}>
//         {loading ? (
//           <CircularProgress color="inherit" size={40} />
//         ) : (
//           <>
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   dataKey="value"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={48}
//                   activeIndex={activeIndex}
//                   activeShape={props => (
//                     <g>
//                       <text
//                         x={props.cx}
//                         y={props.cy - getOuterRadius(props.activeIndex) - 14}
//                         textAnchor="middle"
//                         fill="#ffeb3b"
//                         fontSize={18}
//                         fontWeight="900"
//                       >
//                         {props.payload.name}
//                       </text>
//                       <Sector
//                         {...props}
//                         outerRadius={getOuterRadius(props.activeIndex)}
//                         fill={COLORS[props.index % COLORS.length]}
//                       />
//                     </g>
//                   )}
//                   onMouseEnter={handlePieEnter}
//                   onMouseLeave={handlePieLeave}
//                   onClick={handlePieClick}
//                   paddingAngle={1}
//                   isAnimationActive
//                   label={({ name, value }) => `${name}: ${value}`}
//                   labelLine={false}
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                       cursor="pointer"
//                     />
//                   ))}
//                   <LabelList dataKey="name" position="outside" />
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//             <Typography
//               variant="caption"
//               sx={{ color: "#ffeb3b", mt: 2, fontWeight: 600, textAlign: 'center' }}
//             >
//               Click on each section to know more
//             </Typography>
//             <DetailModal
//               open={modalOpen}
//               onClose={handleModalClose}
//               category={selectedCategory}
//               value={selectedCategory ? selectedCategory.value : ''}
//             />
//           </>
//         )}
//       </Box>
//     </CardContainer>
//   );
// }

// function WeeklyEmissionsChart() {
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:5000/api/weekly/total')
//       .then(res => res.json())
//       .then(data => {
//         setWeeklyData(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   return (
//     <CardContainer sx={{ height: 320, minWidth: 420 }}>
//       <Typography variant="subtitle1" sx={{ mb: 1 }}>Total Carbon Emissions (Weekly)</Typography>
//       <Box sx={{ width: "100%", height: '220px', flexGrow: 1, position: "relative" }}>
//         {loading ? (
//           <CircularProgress color="inherit" size={40} />
//         ) : (
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={weeklyData} barSize={36}>
//               <XAxis dataKey="day" tick={{ fill: "#ffeb3b", fontSize: 16, fontWeight: 700 }} axisLine={false} />
//               <YAxis tick={{ fill: "#ffeb3b" }} axisLine={false} />
//               <Tooltip />
//               <Bar dataKey="value" fill="#ffeb3b" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </Box>
//       <Typography variant="caption" sx={{ fontWeight: 600, mt: 1 }}>
//         Each bar shows your total carbon emission per day (gCO₂).
//       </Typography>
//     </CardContainer>
//   );
// }

// function DashboardMain() {
//   return (
//     <Box
//       component="main"
//       sx={{
//         flexGrow: 1,
//         position: "relative",
//         zIndex: 1,
//         minHeight: "100vh",
//         pt: { xs: 2, md: 6 },
//         pb: { xs: 2, md: 4 },
//         px: { xs: 1, md: 4 },
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center"
//       }}
//     >
//       <Toolbar />
//       <Typography variant="h3" sx={{ color: '#ffeb3b', fontWeight: 900, letterSpacing: 1, mb: 3, ml: 1 }}>
//         Carbon Scope
//       </Typography>
//       <Grid
//         container
//         spacing={3}
//         sx={{
//           flexGrow: 1,
//           height: { xs: 'auto', md: `calc(100vh - ${appBarHeight + 56}px)` },
//         }}
//       >
//         <Grid item xs={12} md={4} sx={{ height: { md: '45%' } }}>
//           <DailyBreakdown />
//         </Grid>
//         <Grid item xs={12} md={3} sx={{ height: { md: '45%' } }}>
//           <TotalCO2 />
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ height: { md: '45%' } }}>
//           <Gamification />
//         </Grid>
//         <Grid item xs={12} md={6} sx={{ height: { md: '45%' } }}>
//           <CategoryChart />
//         </Grid>
//         <Grid item xs={12} md={12} sx={{ height: { md: '40%' }, mt: 3 }}>
//           <WeeklyEmissionsChart />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// function Landing({ opacity }) {
//   return (
//     <Box
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         userSelect: "none",
//         pointerEvents: opacity === 0 ? 'none' : 'auto',
//         opacity,
//         transition: 'opacity 0.5s ease',
//         color: '#ffeb3b',
//         fontWeight: 900,
//         fontSize: { xs: '5rem', md: '10rem' },
//         letterSpacing: 2,
//         zIndex: 10,
//         position: 'relative',
//         backgroundColor: 'transparent',
//       }}
//     >
//       Carbon Scope
//     </Box>
//   );
// }

// function AboutUs() {
//   return (
//     <CardContainer sx={{ minHeight: '100vh', justifyContent: 'flex-start', pt: 6 }}>
//       <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
//         What CarbonScope Does
//       </Typography>
//       <Typography sx={{ whiteSpace: 'pre-line', fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 4, color: "#f0f0ebff" }}>
//         {`CarbonScope is your personal digital eco-pilot, designed to reveal the invisible environmental impact of your online world. We connect directly to your digital life—from the number of emails you send to the hours you spend browsing and streaming—and translate these actions into a clear, understandable carbon footprint. With an engaging, gamified dashboard, we transform complex data into a fun, visual journey. CarbonScope provides instant insights into where your digital emissions are coming from, giving you the knowledge and power to make smarter, greener choices. It’s the ultimate tool to track, understand, and visualize your progress on the path to a more sustainable digital life.`}
//       </Typography>
//       <Typography variant="h4" sx={{ mb: 3, fontWeight: 900 }}>
//         Importance Of CarbonScope
//       </Typography>
//       <Typography sx={{ whiteSpace: 'pre-line', fontSize: { xs: '1.1rem', md: '1.3rem' }, mb: 4, color: "#f0f0ebff"  }}>
//         {`While we focus on physical carbon emissions like those from cars and factories, the digital world's footprint is a hidden giant. The servers, data centers, and networks that power our lives consume vast amounts of energy, generating a significant and growing amount of CO2. CarbonScope tackles this invisible problem head-on, making the abstract concept of digital pollution tangible and actionable for everyone. By empowering individuals to see and reduce their own digital carbon footprint, we're not just creating a cool app—we're fostering a new wave of environmental awareness. Our mission is to show that a more sustainable future starts with a single click, and that together, we can make a massive, positive impact on our planet, one byte at a time.`}
//       </Typography>
//     </CardContainer>
//   )
// }

// function Tips() {
//   const tips = [
//     "Email Smart: Bundle your messages to reduce emissions.",
//     "Tab Cleanup: Close unused tabs to save energy.",
//     "Quality Down: Use 720p streaming to lower carbon footprint.",
//     "Cloud Cleanup: Delete old files from your cloud storage.",
//     "Search Carefully: Think before clicking to reduce data use.",
//     "Turn Off Notifications: Reduce device energy use.",
//     "Clear Cache Regularly: Maintain device performance.",
//     "Use Power Saving Modes: Put devices to sleep when idle.",
//     "Optimize WiFi: Strong connections reduce energy waste.",
//     "Download Music: Listen offline to save data.",
//     "Delete Duplicate Photos: Reduce cloud storage load.",
//     "Be Concise: Shorter messages save resources.",
//     "Update Manually: Avoid automatic updates to save energy.",
//     "Take Gaming Breaks: Limit gaming time to reduce power draw.",
//     "Use Ad Blockers: Block ads to reduce data load.",
//   ];

//   return (
//     <Box sx={{ minHeight: '100vh', pt: 6 }}>
//       <Typography variant="h4" sx={{
//         mb: 4,
//         fontWeight: 900,
//         letterSpacing: 1,
//         color: '#ffeb3b',
//         textAlign: "center",
//         textShadow: '0px 4px 16px #0009',
//       }}>
//         Smart Suggestions
//       </Typography>
//       <Grid container spacing={3} justifyContent="center">
//         {tips.map((tip, idx) => (
//           <Grid item xs={12} sm={8} md={6} key={idx}>
//             <Paper
//               elevation={6}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 background: 'rgba(33,33,38,0.92)',
//                 color: '#fff',
//                 fontSize: '1.13rem',
//                 fontWeight: 500,
//                 boxShadow: "0 2px 20px 0 rgba(0,0,0,0.18)",
//                 borderLeft: '6px solid #ffeb3b',
//               }}
//             >
//               {tip}
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }



// function AppContent() {
//   const theme = useTheme();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [landingOpacity, setLandingOpacity] = useState(1);

//   useEffect(() => {
//     const onScroll = () => {
//       const scrollTop = window.scrollY;
//       const fadeDistance = window.innerHeight * 0.7;
//       let opacity = 1 - scrollTop / fadeDistance;
//       if (opacity < 0) opacity = 0;
//       setLandingOpacity(opacity);
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

//   return (
//     <Box sx={{ display: 'flex', minHeight: "100vh", position: "relative", flexDirection: "column" }}>
//       <CssBaseline />
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           minWidth: "100vw",
//           minHeight: "100vh",
//           width: "100vw",
//           height: "100vh",
//           objectFit: "cover",
//           zIndex: 0,
//         }}
//       >
//         <source src="/ideathon.mp4" type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       <AppBar position="fixed" sx={{ backgroundColor: '#23272b', zIndex: 20 }}>
//         <MuiToolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={toggleSidebar}
//             sx={{ mr: 2 }}
//             aria-label="open sidebar"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ color: '#ffeb3b', fontWeight: 700 }}>
//             Carbon Scope
//           </Typography>
//         </MuiToolbar>
//       </AppBar>

//       <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <Landing opacity={landingOpacity} />

//       <Box
//         sx={{
//           mt: "100vh",
//           flexGrow: 1,
//           position: "relative",
//           zIndex: 1,
//           minHeight: "100vh",
//           pb: { xs: 2, md: 4 },
//           px: { xs: 1, md: 4 },
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "flex-start",
//           width: '100%',
//           backgroundColor: 'transparent',
//         }}
//       >
//         <Toolbar /> {/* offset for fixed AppBar */}

//         <Routes>
//           <Route path="/" element={<DashboardMain />} />
//           <Route path="/gamification" element={<Box sx={{ p: 3, color: '#ffeb3b' }}>Gamification Coming Soon</Box>} />
//           <Route path="/tips" element={<Tips />} />
//           <Route path="/reports" element={<Box sx={{ p: 3, color: '#ffeb3b' }}>Reports Coming Soon</Box>} />
//           <Route path="/about" element={<AboutUs />} />
//         </Routes>
//       </Box>
//     </Box>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }


