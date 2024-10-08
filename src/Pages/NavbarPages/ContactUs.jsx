import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import {motion} from "framer-motion"
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    message: '',
  };
  useEffect(()=>{
    document.title="Contact us - MASTER - an EdTech Platform"
  },[])

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().matches(
      /^[0-9]{10}$/,
      'Phone number is not valid'
    ).required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    let toastId;
    try {
      toastId=toast.loading("Submitting...")
      const response = await axios.post(`${BASE_URL}/api/beta/auth/formSubmit`,{formData:values});
      toast.success('Form submitted successfully');
      resetForm();
    } catch (error) {
      
      
      toast.error('Failed to submit form');
      console.error(error);
    } finally {
      setLoading(false);
      toast.dismiss(toastId)
      setSubmitting(false);
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }} className="pb-[5rem] md:pb-[0rem] px-2 min-h-screen pt-[84px] flex flex-col items-center justify-center">
      <h1 className="text-[2rem] sm:text-[2.5rem]  mx-2 md:text-[4em] bg-gradient-to-r from-red-500 via-purple-400 to-blue-500 bg-clip-text text-transparent font-bold text-center">Share Your Feedback</h1>
        <p className='text-white/60  text-center font-semibold'>We'd love to hear from you! Share your thoughts to help us improve.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className=" w-full sm:w-[500px] mt-6">
          <div className="p-4 bg-white/10 rounded-md sm:w-[100%] lg:max-w-[55rem] w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-md text-white/80" htmlFor="name">Name</label>
                <Field
                  className="bg-white/10 w-full  rounded-md p-2 outline-none"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-white/80" htmlFor="phone">Phone</label>
                <Field
                  className="bg-white/10 w-full  rounded-md p-2 outline-none"
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-white/80" htmlFor="email">Email</label>
                <Field
                  className="bg-white/10 w-full  rounded-md p-2 outline-none"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex flex-col">
                <label className="text-md text-white/80" htmlFor="message">Message</label>
                <Field
                  as="textarea"
                  className="bg-white/10 w-full  rounded-md p-2 outline-none"
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="4"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 md:hover:bg-blue-700 font-bold active:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : " "} transition-all duration-200 bg-blue-600 py-1 px-3 rounded-lg w-fit text-white text-2xl`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </Formik>
    </motion.div>
  );
};

export default ContactUs;
