set -e

cd dist

echo 'www.zerodao.net' > CNAME

git init

git add -A

git commit -m 'deploy'

git push -f git@github.com:ZeroDAO/jiumen.git master:gh-pages

cd -
