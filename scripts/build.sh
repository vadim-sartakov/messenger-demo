DIR="$( cd "$( dirname "$0" )" && pwd )"
cd "${DIR}/../web"
npm run build

cd ../server
rm -rf web
cp -r ../web/build web/