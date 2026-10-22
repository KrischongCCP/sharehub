import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url)),port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml; charset=utf-8','.png':'image/png','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{try{
 const url=new URL(req.url,'http://127.0.0.1:'+port);let pathname=decodeURIComponent(url.pathname);
 if(pathname.endsWith('/index.html')){res.writeHead(302,{Location:pathname.slice(0,-10)+url.search});res.end();return;}
 let target=path.resolve(root,'.'+pathname);if(target!==root&&!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
 if(fs.existsSync(target)&&fs.statSync(target).isDirectory()){if(!pathname.endsWith('/')){res.writeHead(302,{Location:pathname+'/'+url.search});res.end();return;}target=path.join(target,'index.html');}
 if(!fs.existsSync(target)){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Page not found');return;}
 if(!types[path.extname(target)]){res.writeHead(403);res.end('Not available in preview');return;}
 res.writeHead(200,{'Content-Type':types[path.extname(target)],'X-Content-Type-Options':'nosniff','Cache-Control':'no-store','X-Robots-Tag':'noindex, nofollow'});fs.createReadStream(target).pipe(res);
}catch{res.writeHead(400);res.end('Invalid request');}});
server.listen(port,'127.0.0.1',()=>console.log('TMDHC website preview: http://127.0.0.1:'+port+'/tc/'));
