import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Dashboard from './Containers/Dashboard/Dashboard'
import Layout from './Containers/Layout/Layout'
import ProjectList from './Containers/ProjectList/ProjectList'
import Login from './Containers/LoginPage/Login'
import ContactList from './Containers/ContactList/ContactList'
import NewProject from "./Containers/NewProject/NewProject"
import AddGallery from './Containers/Gallery/AddGallery'
import ViewGallery from './Containers/Gallery/ViewGallery'
import AddTestimonial from './Containers/Testimonial/AddTestimonial'
import ManageTestimonial from './Containers/Testimonial/ManageTestimonial'
import AddBanner from './Containers/Banner/AddBanner'
import ManageBanner from './Containers/Banner/ManageBanner'
import EnquiryList from "./Containers/EnquiryList/EnquiryList"

function App() {
  const [openNavbar,setOpenNavbar] = useState(true);
  

  return (
    // <div className='supercontainer'>
    // <Sidebar openNavbar={openNavbar}/>
    // <div className='container'>
    //   <Navbar openNavbar={openNavbar} setOpenNavbar={setOpenNavbar}/>
    //   {/* <Dashboard/> */}
   
    // <BrowserRouter>
    //   <Routes>
    //     <Route path='/' element={<Dashboard/>} />
    //   </Routes>
    
    // </BrowserRouter>
    // </div>
      
    // </div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
      <Route path="/layout" element={<Layout />}>
        
          <Route index path='/layout' element={<Dashboard />} />
          <Route path="projectlist" element={<ProjectList />}/> 
          <Route path="contactlist" element={<ContactList />}/> 
          <Route path="enquirylist" element={<EnquiryList />}/> 
          <Route path="newproject" element={<NewProject />}/> 
          <Route path="addgallery" element={<AddGallery />}/> 
          <Route path="viewgallery" element={<ViewGallery />}/> 
          <Route path="addtestimonial" element={<AddTestimonial />}/>
          <Route path="managetestimonial" element={<ManageTestimonial/>}/>
          <Route path="addbanner" element={<AddBanner/>}/>   
          <Route path="managebanner" element={<ManageBanner/>}/> 
          
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
