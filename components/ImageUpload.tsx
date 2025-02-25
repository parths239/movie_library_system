"use client"

import React, { useRef, useState } from 'react'
import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config  from '@/lib/config'
import { useToast } from "@/hooks/use-toast"


interface File {
  filePath: string;
}

interface ImageUploadProps {
  onFileChange: (filePath: string) => void;
}


const authenticator = async()=>{

    try {

        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

        if(!response.ok){
            const errorText = await response.text()

            throw new Error(`Request failed with error: ${errorText}`)
        }

        const data = await response.json()
        const {signature, expire, token} = data;
        return {signature, expire, token}
        
    } catch (error) {

        throw new Error(`Authentication request failed with error: ${error}`)
        
    }
}

const {env: {imagekit: {publicKey, urlEndpoint}}} = config;


const ImageUpload: React.FC<ImageUploadProps> = ({ onFileChange }) => {

    const [file, setFile] = useState<File | null>(null)
    const ikUploadRef = useRef(null)
    const { toast } = useToast()

    const onSuccess = (res:any)=>{
        setFile({filePath: res.filePath})
        console.log(res.filePath)
        onFileChange(res.filePath)
        toast({
            title: "Image uploaded successfully",
            description: `${res.filePath} uploaded successfully`,
          })
    }

    const onError = (error:any)=>{
        console.log(error,"error")
        toast({
            title: "Image upload error",
            description: error,
          })
    }

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className='hidden'
        ref={ikUploadRef}
        fileName="test-upload.png"
        onError={onError}
        onSuccess={onSuccess}
      />
      <button className='upload-btn'
      onClick={(e)=>{
        e.preventDefault();
        if(ikUploadRef.current){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
          ikUploadRef.current?.click()
        }
      }}
      >
        <p className='text-base text-light-100'>Upload a file</p>
        {
        file &&
        <p className='upload-filename'>{file.filePath}</p>
        }
        </button>

        {
            file && (<IKImage path={file.filePath} alt={file.filePath} width={500} height={500}/>)
        }
      
    </ImageKitProvider>
  )
}

export default ImageUpload