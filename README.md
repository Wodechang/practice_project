# practice_project

Practice repository for Python, algorithms, and machine learning.

## Contents

| Folder | What's in it |
|--------|--------------|
| [`leetcode_solutions/`](leetcode_solutions/) | Python solutions to LeetCode problems |
| [`machine_learning_projects/`](machine_learning_projects/) | Jupyter notebooks and their datasets |

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Running the notebooks

```bash
jupyter notebook machine_learning_projects/
```

Datasets live in `machine_learning_projects/data/`, so notebooks load them
with relative paths and work no matter where the repo is cloned.
