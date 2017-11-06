// import os from 'os'
import Mac from './mac'
// import Linux from './linux'
// import Win32 from './win32'


export default function Hosts(path) {
  console.log(path)
  var platform = process.platform;
  var os
  switch (platform) {
      case 'darwin':
          os = Mac(path);
          break;
      case 'linux':
          os = linux(path);
          break;
      case 'win32':
          os = win32(path);
          break;
  }
  return os
}
