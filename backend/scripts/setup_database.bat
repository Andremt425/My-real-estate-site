@echo off
echo Setting up the database...
python init_db.py
python db_migrations.py
echo Database setup complete!
pause