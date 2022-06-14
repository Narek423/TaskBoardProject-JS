import React, { useRef } from "react";
import NavMainBar from "../Nav-Bar/NavMainBar";
import img1 from "../img/img.jpg"
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles(() => {
    return {
        maindiv:{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        },
        container: {
            flex: 10,
            overflowY: 'scroll',
            backgroundColor: '#b3ffe6',

            "&::-webkit-scrollbar": {
             width: 14,
           },
           "&::-webkit-scrollbar-track": {
             background: "grey",
           },
           "&::-webkit-scrollbar-thumb": {
             background: "#019CAD",
           },
           "&::-webkit-scrollbar-thumb:hover": {
             background: "#555",
           },
       }
    }
})
function HomePage(params) {
    const classes = useStyle();
    const about = useRef();
    const contactUs = useRef();

   
    const scrollTo = (ref) => {
      return ref?.current?.scrollIntoView({block: 'center', behavior: "smooth"})
    }


  return (
    <div  
      ref={about}
      className={classes.maindiv}
    //  style={{
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column'
    // }}
    >
      <NavMainBar 
      about={about} contactUs={contactUs} scrollTo={scrollTo}
      />
      {/* <button onClick={() => {
        return about?.current?.scrollIntoView({block: 'center', behavior: "smooth"})
      }}></button>
           <button onClick={() => {
        return contactUs?.current?.scrollIntoView({block: 'center', behavior: "smooth"})
      }}></button> */}
      <div                                      /////scroll@ chi haskanum???????
          className={classes.container}
    //    style={{
    //        flex: 10,
    //        overflowY: 'scroll',
    //        "&::-webkit-scrollbar": {
    //         width: 4,
    //       },
    //       "&::-webkit-scrollbar-track": {
    //         background: "grey",
    //       },
    //       "&::-webkit-scrollbar-thumb": {
    //         background: "#019CAD",
    //       },
    //       "&::-webkit-scrollbar-thumb:hover": {
    //         background: "#555",
    //       },
    //   }}
      >
      <div 
      ref={contactUs}
          style={{
          height: 550,
          backgroundColor: '#99ffdd',
          marginTop: '4%',
          alignItems: 'center',
          float: "right",         
          display: "flex",
          textAlign: 'center'
      }}>
      <div
        style={{
          height: "100%",
          height: "90%",
          backgroundImage: `url("${img1}")`,
          backgroundSize: "100% 100%",
          alignItems: 'center',
          flex: 5
        }}
      >
       
      </div>
      <div style={{
          flex: 4,
      }}>
          <h1>Create own tasks</h1>
      <span >asssssssssssd naskdgasjn gas uiasjdi ajduiojas iudjasiy jiuasj ilasjdioyjasodn adjsioajdt asssssssssssddasduiasj
            dasmhdlkjaslkdiopasjdiouaskjduiasjkduasjdskjdysaokjtdjoasd
            asdkjgmnasuilm,dioasyhkdmuiasjdoukasjndiu
        </span>
        </div>
      </div>
      


      <div 
          style={{
          height: 550,
          backgroundColor: '#99ffdd',
          marginTop: '4%',
          alignItems: 'center',
          float: "right",         
          display: "flex",
          textAlign: 'center',
      }}>
           <div style={{
          flex: 4
      }}>
          <h1>Create own tasks</h1>
      <span >asssssssssssd naskdgasjn gas uiasjdi ajduiojas iudjasiy jiuasj ilasjdioyjasodn adjsioajdt asssssssssssddasduiasj
            dasmhdlkjaslkdiopasjdiouaskjduiasjkduasjdskjdysaokjtdjoasd
            asdkjgmnasuilm,dioasyhkdmuiasjdoukasjndiu
        </span>
        </div>
      <div
        style={{
          height: "100%",
          height: "90%",
          backgroundImage: `url("${img1}")`,
          backgroundSize: "100% 100%",
          alignItems: 'center',
          flex: 5
        }}
      >
       
      </div>
     


     
      </div> 

      <div 
          ref={about}
          style={{
          height: 550,
          backgroundColor: '#99ffdd',
          marginTop: '4%',
          alignItems: 'center',
          float: "right",         
          display: "flex",
          textAlign: 'center'
      }}>
      <div
        style={{
          height: "100%",
          height: "90%",
          backgroundImage: `url("${img1}")`,
          backgroundSize: "100% 100%",
          alignItems: 'center',
          flex: 5
        }}
      >
       
      </div>
      <div style={{
          flex: 4,
      }}>
          <h1>Create own tasks</h1>
      <span >asssssssssssd naskdgasjn gas uiasjdi ajduiojas iudjasiy jiuasj ilasjdioyjasodn adjsioajdt asssssssssssddasduiasj
            dasmhdlkjaslkdiopasjdiouaskjduiasjkduasjdskjdysaokjtdjoasd
            asdkjgmnasuilm,dioasyhkdmuiasjdoukasjndiu
        </span>
        </div>
      </div>



      <div style={{
        textAlign: 'center',
          backgroundColor: '#99ffdd',
          marginTop: '4%',
      }}>
      <h1>Abot us</h1>
      <span>saaaaaaaaaadylkasudjasdiasjd
        sfdsfsddddddddddddddddddddddd<br />ddddddddddddddddddddddddddf
        sdfsdf   <br />     dsfdssssss dfsdf fds   <br />   fsdfsd fsdfsdfsd 
         sdfsdfsdfdsfsdfsdfsd
      </span>
      </div>
      
      


      </div>
    </div>
  );
}

export default HomePage;
