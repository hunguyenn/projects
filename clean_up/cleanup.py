import os
userhome = os.path.expanduser('~')
desktop = userhome + '/Desktop/'
path = desktop
files = [f for f in os.listdir(path) if (os.path.isfile(os.path.join(path, f)) and f[0] != '.')]
exts = set([])
for f in files:
	exts.add(os.path.splitext(f)[1][1:])

for e in exts:
	if not os.path.exists(path + e):
		os.makedirs(path + e)

for f in files:
	os.rename(path+f, path+os.path.splitext(f)[1][1:]+"/"+f)
