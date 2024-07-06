// handler for AWS Lambda
import PythonEnv from './python_scripts/setupPythonEnv.mjs'

export const handler = async (event) => {
  let response;

  try {
    const venv = new PythonEnv()
    venv.main()
  
    response = {
      statusCode: 200,
      body: JSON.stringify('Lambda Handler, No errors occurred!'),
    };
  } catch (error) {
    response = {
      statusCode: 500,
      body: JSON.stringify('Lambda Handler, Error Occurred: ', error),
    };
  }
  
  return response;
};

handler()