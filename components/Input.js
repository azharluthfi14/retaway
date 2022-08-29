import PropTypes from "prop-types";
import classNames from "classnames";
import { useField } from "formik";

const Input = ({ type = "", label = "", className = "", ...props }) => {
  const [field, meta] = useField(props);
  const error = meta?.touched && meta?.error;
  return (
    <div className={classNames(className, "flex flex-col space-y-1")}>
      {label ? (
        <label htmlFor="email" className="text-gray-600">
          {label}
        </label>
      ) : null}

      <div className="flex-1">
        {type === "textarea" ? (
          <textarea
            {...field}
            {...props}
            className={classNames(
              `w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none 
            focus:ring-4 focus:ring-opacity-20 transition disabled:opacity-50 disabled:cursor-not-allowed`,
              error
                ? "border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            )}
          />
        ) : (
          <div className="relative">
            <input
              {...field}
              {...props}
              type={type}
              className={classNames(
                `w-full shadow-sm rounded-md py-2 pl-4 truncate border focus:outline-none focus:ring-4 focus:ring-opacity-20 
                transition disabled:opacity-50 disabled:cursor-not-allowed`,
                error
                  ? "border-red-400 text-red-800 focus:border-red-400 focus:ring-red-400"
                  : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
              )}
            />
            {error && type !== "number" ? (
              <span className="pr-2 absolute right-0 top-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            ) : null}
          </div>
        )}
      </div>

      {error ? (
        <p name="email" className="text-red-600 text-sm first-letter:uppercase">
          {error}
        </p>
      ) : null}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
