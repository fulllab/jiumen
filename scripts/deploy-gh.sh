set -e

cd dist

echo 'jiumen.zerodao.net' > CNAME

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:ZeroDAO/jiumen-palyground.git master

cd -
