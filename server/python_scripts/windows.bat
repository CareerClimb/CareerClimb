:: Check if virtual environment directory exists
if not exist "venv\" (
  :: Create a virtual environment
  python -m venv venv
)

:: Activate the virtual environment
call venv\Scripts\activate

:: Install dependencies
pip install --upgrade pip
python -m pip install -U python-jobspy
python -m pip install "pymongo[srv]"

:: Run the Python script
python3 ./python_scripts/scrapeJobs.py