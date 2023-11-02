import React,{useState,useEffect} from 'react'
import styles from './EnquiryList.module.css'
import DataTable from 'react-data-table-component';
import axios from 'axios';

const EnquiryList = () => {
    const [enquiryData,setEnquiryData] = useState([]);
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'PhoneNumber',
            selector: row => row.phonenumber,
        },
        {
            name: 'Project',
            selector: row => row.project,
        },
    ];

    useEffect(() => {
        axios.get('http://64.227.148.189/api/enquiry')
          .then(response => {
           console.log(response.data.data)
           setEnquiryData(response.data.data)
          })
          .catch(error => {
            console.error(error);
          });
      }, []);

    
    // const data = [
    //     {
    //         id: 1,
    //         name: 'Beetlejuice',
    //         email: 'riturajpathak1998@gmail.com',
    //         phonenumber: 'Project Related',
    //         project: "Now is the winter of our discontent Made glorious summer by this sun of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried."
    //     },
    //     {
    //         id: 2,
    //         name: 'Beetlejuice',
    //         email: 'riturajpathak1998@gmail.com',
    //         phonenumber: 'Project Related',
    //         project: "Now is the winter of our discontent Made glorious summer by this sun of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried."
    //     },
        
    // ]

    const data = enquiryData.map(item => ({
        id: item._id,
        name: item.name,
        email: item.email,
        phonenumber: item.mobile,
        project: item.projectId?.projectName
      }));
  return (
    <>
    <div>Enquiry List</div>
    <div  className={styles.enquiryList}>
    <DataTable
            columns={columns}
            data={data}
            wrap={true}
            sortable= {true}
            pagination
                
        />
    </div>
    </>
  )
}

export default EnquiryList