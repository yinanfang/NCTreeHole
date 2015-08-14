import os

print "print __file__"
print __file__

print "os.path.abspath"
print os.path.abspath(__file__)

print "\nprint os.path.join(os.path.dirname(__file__), '..')"
print os.path.join(os.path.dirname(__file__), '..')

print "\nprint os.path.dirname(os.path.realpath(__file__))"
print os.path.dirname(os.path.realpath(__file__))

print "\nprint os.path.abspath(os.path.dirname(__file__))"
print os.path.abspath(os.path.dirname(__file__))

print "\nprint os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')"
DJANGO_ROOT_DIR = os.path.join(os.path.dirname(os.path.realpath(__file__)), '..')
print DJANGO_ROOT_DIR

print "\n'NAME': os.path.join(DJANGO_ROOT_DIR, 'main.db')"
print os.path.join(DJANGO_ROOT_DIR, 'main.db')

print "\nPROJECT_PATH = os.path.split(os.path.abspath(os.path.dirname(__file__)))[0]"
PROJECT_PATH = os.path.split(os.path.abspath(os.path.dirname(__file__)))[0]
print PROJECT_PATH

print "\n"
gettext = lambda s: s
print gettext

raw_input('Press Enter to exit')



