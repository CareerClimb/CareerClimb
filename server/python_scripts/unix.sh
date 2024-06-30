#!/bin/bash

# Check if virtual environment directory exists
if [ ! -d "venv" ]; then
  # Create a virtual environment
  python3 -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -U python-jobspy

# Run the Python script
python3 ./python_scripts/scrapeJobs.py