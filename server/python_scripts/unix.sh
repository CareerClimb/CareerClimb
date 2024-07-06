#!/bin/bash

# Check if virtual environment directory exists
if [ ! -d "venv" ]; then

  # Create a virtual environment
  echo "Creating Virtual Environment!"
  python3 -m venv venv

  # Install dependencies
  pip install --upgrade pip
  python -m pip install -U python-jobspy
  python -m pip install "pymongo[srv]"==4.0
fi

# Activate the virtual environment
source venv/bin/activate

# Run the Python script
python3 ./python_scripts/scrapeJobs.py "$1"   # "$1" means first cmdline argument to unix script