const loader = '<i class="fas fa-sync fa-spin"></i>'

const variables = {
  loader: loader,
  headers: {
    "Accept": "application/vnd.vtex.ds.v10+json",
    'REST-range': 'resources=0-10',
    'Content-Type': 'application/json; charset=utf-8',
    "x-vtex-api-appKey": "vtexappkey-elevelife-AXRPKM",
    "x-vtex-api-appToken": "AFWHDBVISYKAURWJTYLYAYAKHFIWCVOJKEVUPENVXVCVSGFYAMAFEEHCEMZYTYGXJAQQWBTPKPBFVFRBZJWPUJFGXTQCFOCYOFLRPOCYSLUPCBGYUXYKCRCAVKSCKRKV"
  }
}

export default function getVariables(param) {
  return (param !== undefined && param !== null && variables[param] !== undefined) ? variables[param] : variables;
}
