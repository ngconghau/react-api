import React from "react";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { areaApi } from "../../api";
import Router, { useRouter } from "next/router";
import { areas } from "../../utils/area/interface";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Col
} from 'reactstrap';


type Props = {
  idArea: string;
};

const UpdateArea = ({ idArea }: Props) => {
  const [area, setArea] = useState<areas>({
    id: undefined || '',
    district: undefined || '',
    street: undefined || '',
  });
  useEffect(() => {

    const getData = async()=>{
      try{
        const data = await areaApi.getAreaById(idArea).then((res)=>{
          if(res && res.data){
            setArea(res.data)
          }
        })
      } catch(err:any){  
      }
    }
    getData();
    
  }, [idArea]);

  const handleCancel = ()=>{
    Router.back();
  }


  const handlePut = async (idArea: string) => {
      if (area.district === '' || area.street === '') {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
  
        Toast.fire({
          icon: "warning",
          title: "Fill infomation before submit",
        });
    }else {
      Swal.fire({
        title: 'Are you sure update?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then(async(result) => {
        if (result.isConfirmed) {
  
          const update = async()=>{
            try{
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              Toast.fire({
                icon: 'success',
                title: 'Checking Update ......'
              })
              await areaApi.update(idArea, area).then((res)=>{
                if(res && res.data){
                  setArea(res.data);
                }
                if(res.status === 200){
                  Swal.fire('Update success')
                  Router.push('/area');
                }
              })
            }catch(e:any){
              Swal.fire('Nothing changes');
            }
          }
          update();
  
    
        }
      })

    }
    

    
  };


  return (
    <div style={{display:'flex',justifyContent:'center', flexDirection:'column'}}>
      {area  && (
        <>
        <Form className="form" style={{border:'1px solid black'}}>
        <h2 style={{textAlign:'center'}}>Update Area</h2>
          <FormGroup >
            <Label for="exampleEmail">District</Label>
            <Col >
            <Input
             onChange={(e) => setArea({ ...area, district: e.target.value })}
             value={area.district}
              type="text"
              placeholder="San Ramon"
              name="district"
            />
            </Col>
            
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword">Street</Label>
            <Col >
            <Input
             onChange={(e) => setArea({ ...area, street: e.target.value })}
             value={area.street}
              type="text"
              name="street"
              placeholder="3141 Crow Canyon Place"
            />
            </Col>
          
          </FormGroup>
          <div style={{display:'flex', justifyContent:'center'}}>
          <Button  onClick={() => handlePut(idArea)}>Submit</Button>
          <Button style={{marginLeft:'5px'}}  onClick={() => handleCancel()}>Cancel</Button>
          
          </div>
        
      </Form>
         
        </>
      )
    }

      <style>
        {
          `
          .form {
            padding: 1em;
          }
          
          label {
            font-weight: 600;
          }
          `
        }
      </style>
    </div>
  );
};

export default UpdateArea;
