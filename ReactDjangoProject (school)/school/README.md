# School
It is a performed project for practice in Amado.

## QuickStart for Django
1) python -m venv venv
2) pip install -r requirements/{dev/prod}.txt
3) Global enviroment:
   1) windows: setx SECRET_KEY {your_key} \m
   2) unix: export SECRET_KEY={your_key}
4) python manage.py runserver --settings=store.settings.{dev/prod}
