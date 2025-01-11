import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, message } from 'antd';
import claimApi from '../api/claimApi.js';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const PDFJS = window.pdfjsLib;


const UploadDocument = ({ setDocument }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [publicId, setPublicId] = useState('');
    const [fileList, setFileList] = useState([]);
    const cloudName = process.env.REACT_APP_CLOUD_NAME;
    const folderName = process.env.REACT_APP_FOLDER_NAME;

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => {
        let updatedList = newFileList;
        if (!!updatedList[0]?.response) {
            updatedList[0].thumbUrl = updatedList[0]?.response?.url;
            updatedList[0].preview = updatedList[0]?.response?.url;
        };
        setFileList(updatedList);
    };

    const processPdfToImage = async (file) => {
        try {
            const fileUrl = URL.createObjectURL(file);
            const pdf = await PDFJS.getDocument(fileUrl).promise;
            const totalPages = pdf.numPages;
            const imageUrls = [];

            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 }); // Adjust scale for higher resolution
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({ canvasContext: context, viewport }).promise;
                imageUrls.push(canvas.toDataURL("image/png"));
            }

            const response = await fetch(imageUrls[0]);
            const blob = await response.blob();
            return new File([blob], `${file.name}.jpg`, { type: 'image/jpeg' });
        } catch (error) {
            console.error('PDF to Image conversion error:', error);
            throw new Error('Failed to process PDF.');
        }
    };

    const handleCustomRequest = async ({ file, onSuccess, onError }) => {
        try {
            let uploadFile = file;
            // Check if the uploaded file is a PDF
            if (file.type === 'application/pdf') {
                message.info('Converting PDF to image...');
                uploadFile = await processPdfToImage(file);
                message.success('PDF converted to image successfully.');
            }

            // Create FormData and upload the file
            const formData = new FormData();
            formData.append('file', uploadFile);
            formData.append('file', uploadFile);
            formData.append('upload_preset', 'claim_management');
            formData.append('cloud_name', cloudName);
            formData.append('folder', folderName);

            const response = await claimApi.uploadDocument(formData, cloudName);
            setPreviewImage(response.url);
            setDocument(response.url);
            setPublicId(response.public_id);
            onSuccess(response);
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
            message.error(error.message || 'Failed to upload file.');
        }
    };

    const handleRemove = async (file) => {
        try {
            await claimApi.deleteDocument(publicId);
            message.success(`File ${file.name} removed successfully`);
        } catch (error) {
            message.error('Failed to remove file');
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    return (
        <>
            <Upload
                customRequest={handleCustomRequest}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default UploadDocument;
