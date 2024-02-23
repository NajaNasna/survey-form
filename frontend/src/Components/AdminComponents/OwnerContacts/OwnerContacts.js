// import React, { useEffect, useState } from 'react';
// import AdminNav from '../AdminNavbar/AdminNav';
// import DataTable from 'react-data-table-component';
// import axios from 'axios';

// function OwnerContacts() {
//     const [ownerRecords, setOwnerRecords] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:5000/owner-details')
//             .then(response => {
//                 console.log('Owner Records:', response.data.owner_details);
//                 setOwnerRecords(response.data.owner_details);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setLoading(false);
//             });
//     }, []);

//     useEffect(() => {
//         const filteredData = ownerRecords.filter(item =>
//             Object.values(item).some(value =>
//                 value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//             )
//         );
//         setSearchResults(filteredData);
//     }, [searchQuery, ownerRecords]);

//     return (
//         <div>
//             <AdminNav />
//             <div className="container mt-5">
//                 <input
//                     className='form-control'
//                     type="search"
//                     placeholder="Search..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     aria-label="Search"
//                 />
//                 {!loading && ownerRecords.length > 0 && (
//                     <DataTable
//                         title="Owner Contact Details"
//                         columns={ownerRecords.length > 0 ? Object.keys(ownerRecords[0]).map(key => ({
//                             name: key,
//                             selector: key,
//                             sortable: true
//                         })) : []}
//                         data={searchResults}
//                         fixedHeader
//                         pagination
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

// export default OwnerContacts;























import React, { useEffect, useState } from 'react'
import AdminNav from '../AdminNavbar/AdminNav'
import DataTable from 'react-data-table-component';
import axios from 'axios';


function OwnerContacts() {

    const data = [
        { id: 1, name: 'John Doe', age: 30, country: 'USA' },
        { id: 2, name: 'Jane Smith', age: 25, country: 'Canada' },
        { id: 3, name: 'Mike Johnson', age: 35, country: 'UK' },
        { id: 4, name: 'kim Doe', age: 30, country: 'USA' },
        { id: 5, name: 'max Smith', age: 25, country: 'Canada' },
        { id: 6, name: 'hoi Johnson', age: 35, country: 'UK' },
        { id: 7, name: 'hi Doe', age: 30, country: 'USA' },
        { id: 8, name: 'roy Smith', age: 25, country: 'Canada' },
        { id: 9, name: 'ram Johnson', age: 35, country: 'UK' },
        { id: 10, name: 'samm Doe', age: 30, country: 'USA' },
        { id: 11, name: 'emmanuel Smith', age: 25, country: 'Canada' },
        { id: 12, name: 'elsa Johnson', age: 35, country: 'UK' },
        { id: 13, name: 'jacob Doe', age: 30, country: 'USA' },
        { id: 14, name: 'lily Smith', age: 25, country: 'Canada' }
    ];

    const[records, setRecords] = useState(data);
    const[searchQuery, setSearchQuery] = useState('');
    const[searchResults, setSearchResults] = useState([]);
    const[ownerRecords, setOwnerRecords]=useState([])

    const columns = [
        {
            name: 'Name',
            selector:  row=>row.name,
            sortable: true
        },
        {
            name: 'Age',
            selector:  row=>row.age,
            sortable: true
        },
        {
            name: 'Country',
            selector:  row=> row.country,
            sortable: true
        }
    ];
    
    


    useEffect(() => {
        const filteredData = records.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredData);
    }, [searchQuery , records]);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };



    // useEffect(() => {
    //     const ownerDatas =  axios.get('http://localhost:5000/owner-details')
    //         .then(response => {
    //             console.log('looo')

    //             console.log(response)
    //             setOwnerRecords([response.data]);
    //             console.log(ownerDatas)
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);



    useEffect(() => {
        
        // const fetchData = async()=>{
        //     try {
        //         const datas = await axios.get('http://localhost:5000/owner-details')
        //         if(datas){
        //             console.log('looo');
        //             console.log(datas);
        //             console.log(datas.data)
        //             console.log(datas.data.owner_details)
        //             setOwnerRecords(datas.data)
        //             console.log(ownerRecords)
        //         } 
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
            
        // }

        
        axios.get('http://localhost:5000/owner-details')
            .then(response => {
            console.log('looo');
            console.log(response);
            console.log(response.data)
            console.log(response.data.owner_details)
            setOwnerRecords(response.data)
            console.log(ownerRecords)
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    
    // useEffect(() => {
    //     console.log(ownerRecords);
    // }, [ownerRecords]);
    


  return (
    <div>
        <AdminNav/>
        <div className="container mt-5">

        <input
        
        className='form-control'
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search"
            />

        <DataTable
            title="Owner Contact Details"
            columns={columns}
            // keyField="id"

            data={searchResults}
            // searchable={true}
            fixedHeader
            pagination

        />
        </div>
    </div>
  )
}

export default OwnerContacts










// import React, { useEffect, useState } from 'react'
// import AdminNav from '../AdminNavbar/AdminNav'
// import DataTable from 'react-data-table-component';
// import axios from 'axios';


// function OwnerContacts() {

//     const data = [
//         { id: 1, name: 'John Doe', age: 30, country: 'USA' },
//         { id: 2, name: 'Jane Smith', age: 25, country: 'Canada' },
//         { id: 3, name: 'Mike Johnson', age: 35, country: 'UK' },
//         { id: 4, name: 'kim Doe', age: 30, country: 'USA' },
//         { id: 5, name: 'max Smith', age: 25, country: 'Canada' },
//         { id: 6, name: 'hoi Johnson', age: 35, country: 'UK' },
//         { id: 7, name: 'hi Doe', age: 30, country: 'USA' },
//         { id: 8, name: 'roy Smith', age: 25, country: 'Canada' },
//         { id: 9, name: 'ram Johnson', age: 35, country: 'UK' },
//         { id: 10, name: 'samm Doe', age: 30, country: 'USA' },
//         { id: 11, name: 'emmanuel Smith', age: 25, country: 'Canada' },
//         { id: 12, name: 'elsa Johnson', age: 35, country: 'UK' },
//         { id: 13, name: 'jacob Doe', age: 30, country: 'USA' },
//         { id: 14, name: 'lily Smith', age: 25, country: 'Canada' }
       
//     ];

//     const [records, setRecords] = useState(data);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const[ownerRecords, setOwnerRecords]=useState([])

//     const columns = [
//         {
//             name: 'Name',
//             selector:  row=>row.name,
//             sortable: true
//         },
//         {
//             name: 'Age',
//             selector:  row=>row.age,
//             sortable: true
//         },
//         {
//             name: 'Country',
//             selector:  row=> row.country,
//             sortable: true
//         }
//     ];
    
    


//     useEffect(() => {
//         const filteredData = records.filter(item =>
//             item.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setSearchResults(filteredData);
//     }, [searchQuery, records]);

//     const handleSearch = (e) => {
//         const query = e.target.value;
//         setSearchQuery(query);
//     };



//     useEffect(() => {
//         const ownerDatas =  axios.get('http://localhost:5000/owner-details')
//             .then(response => {
//                 console.log('looo')

//                 console.log(response)
//                 setOwnerRecords([response.data]);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);



//   return (
//     <div>
//         <AdminNav/>
//         <div className="container mt-5">

//         <input
        
//         className='form-control'
//                 type="search"
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 aria-label="Search"
//             />

//         <DataTable
//             title="Owner Contact Details"
//             columns={columns}
//             // keyField="id"

//             data={searchResults}
//             // searchable={true}
//             fixedHeader
//             pagination

//         />
//         </div>
//     </div>
//   )
// }

// export default OwnerContacts