import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/hotels');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 shadow p-6 rounded-lg text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Login</h1>

      {isAuthenticated ? (
        <div className="space-y-4 text-center">
          {/* You can show a logout option or redirect message if needed */}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className="w-full px-4 py-2 border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-500 text-sm">{formik.errors.username}</div>
            )}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full px-4 py-2 border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
