// Full KRL Commuter Line dataset (converted from KRL_Maps.py)
export const STATIONS: Record<number, string> = {
  0: "Tangerang", 1: "Tanah Tinggi", 2: "Batu Ceper", 3: "Poris", 4: "Kali Deres",
  5: "Rawa Buaya", 6: "Bojong Indah", 7: "Taman Kota", 8: "Pesing", 9: "Grogol",
  10: "Duri",
  11: "Cikarang", 12: "Metland TelagaMurni", 13: "Cibitung", 14: "Tambun",
  15: "Bekasi Timur", 16: "Bekasi", 17: "Kranji", 18: "Cakung", 19: "Klender Baru",
  20: "Buaran", 21: "Klender", 22: "Jatinegara", 23: "Matraman", 24: "Manggarai",
  25: "Sudirman", 26: "Sudirman Baru", 27: "Karet", 28: "Tanah Abang", 29: "Angke",
  30: "Pondok Jati", 31: "Kramat", 32: "Gang Sentiong", 33: "Pasar Senen",
  34: "Kemayoran", 35: "Rajawali", 36: "Kampung Bandan",
  37: "Palmerah", 38: "Kebayoran", 39: "Pondok Ranji", 40: "Jurang Mangu",
  41: "Sudimara", 42: "Rawa Buntu", 43: "Serpong", 44: "Cisauk", 45: "Cicayur",
  46: "Jatake", 47: "Parung Panjang", 48: "Cilejit", 49: "Daru", 50: "Tenjo",
  51: "Tigaraksa", 52: "Cikoya", 53: "Maja", 54: "Citeras", 55: "Rangkasbitung",
  56: "Jambubaru", 57: "Catang", 58: "Cikeusal", 59: "Walantaka", 60: "Serang",
  61: "Karangantu", 62: "TonjongBaru", 63: "Cilegon", 64: "Krenceng", 65: "Merak",
  66: "Jakarta Kota", 67: "Ancol", 68: "Tanjung Priok",
  69: "Bogor", 70: "Cilebut", 71: "Bojong Gede", 72: "Citayam", 73: "Depok",
  74: "Depok Baru", 75: "Pondok Cina", 76: "Univ. Indonesia", 77: "Univ. Pancasila",
  78: "Lenteng Agung", 79: "Tanjung Barat", 80: "Pasar Minggu", 81: "Pasar Minggu Baru",
  82: "Duren Kalibata", 83: "Cawang", 84: "Tebet", 85: "Cikini", 86: "Gondangdia",
  87: "Juanda", 88: "Sawah Besar", 89: "Mangga Besar", 90: "Jayakarta",
  91: "Pondok Rajeg", 92: "Cibinong", 93: "Nambo",
};

export const TRANSIT_STATIONS = new Set([10, 24, 28, 36, 55, 66, 72]);

export const COORDS: Record<number, { x: number; y: number }> = {
  0:{x:60,y:220},1:{x:100,y:220},2:{x:140,y:220},3:{x:175,y:220},4:{x:210,y:220},
  5:{x:245,y:220},6:{x:275,y:220},7:{x:305,y:220},8:{x:330,y:215},9:{x:355,y:210},
  10:{x:385,y:200},11:{x:780,y:210},12:{x:740,y:210},13:{x:710,y:210},14:{x:675,y:210},
  15:{x:645,y:210},16:{x:615,y:210},17:{x:585,y:210},18:{x:555,y:205},19:{x:530,y:205},
  20:{x:510,y:205},21:{x:490,y:205},22:{x:465,y:200},23:{x:445,y:225},24:{x:430,y:250},
  25:{x:415,y:235},26:{x:405,y:225},27:{x:395,y:225},28:{x:380,y:230},29:{x:370,y:185},
  30:{x:478,y:185},31:{x:495,y:175},32:{x:508,y:165},33:{x:510,y:150},34:{x:500,y:135},
  35:{x:470,y:125},36:{x:420,y:155},37:{x:360,y:245},38:{x:340,y:270},39:{x:315,y:285},
  40:{x:295,y:295},41:{x:270,y:300},42:{x:245,y:305},43:{x:220,y:308},44:{x:195,y:312},
  45:{x:170,y:315},46:{x:145,y:318},47:{x:115,y:320},48:{x:88,y:328},49:{x:65,y:335},
  50:{x:45,y:345},51:{x:30,y:358},52:{x:22,y:372},53:{x:18,y:388},54:{x:15,y:403},
  55:{x:12,y:420},56:{x:30,y:435},57:{x:48,y:435},58:{x:68,y:435},59:{x:90,y:432},
  60:{x:112,y:428},61:{x:130,y:422},62:{x:148,y:415},63:{x:160,y:405},64:{x:168,y:393},
  65:{x:172,y:378},66:{x:440,y:130},67:{x:460,y:110},68:{x:490,y:95},
  69:{x:480,y:510},70:{x:475,y:488},71:{x:470,y:468},72:{x:462,y:448},73:{x:455,y:430},
  74:{x:450,y:415},75:{x:447,y:400},76:{x:444,y:385},77:{x:442,y:370},78:{x:440,y:355},
  79:{x:438,y:340},80:{x:436,y:325},81:{x:434,y:312},82:{x:432,y:300},83:{x:448,y:288},
  84:{x:448,y:272},85:{x:440,y:258},86:{x:438,y:245},87:{x:436,y:232},88:{x:434,y:218},
  89:{x:432,y:205},90:{x:435,y:185},91:{x:490,y:448},92:{x:510,y:462},93:{x:528,y:475},
};

// Weighted edges: [from, to, minutes]
export const EDGES: [number, number, number][] = [
  [0,1,3],[1,2,4],[2,3,2],[3,4,2],[4,5,4],[5,6,1],[6,7,2],[7,8,2],[8,9,2],[9,10,4],
  [11,12,4],[12,13,2],[13,14,7],[14,15,4],[15,16,5],[16,17,2],[17,18,6],[18,19,2],
  [19,20,1],[20,21,2],[21,22,9],[22,23,2],[23,24,5],[24,25,4],[25,26,1],[26,27,1],
  [27,28,6],[28,10,6],[10,29,4],[22,30,2],[30,31,2],[31,32,1],[32,33,6],[33,34,4],
  [34,35,3],[35,36,9],[36,29,8],
  [28,37,6],[37,38,6],[38,39,8],[39,40,2],[40,41,4],[41,42,5],[42,43,4],[43,44,4],
  [44,45,3],[45,46,2],[46,47,6],[47,48,7],[48,49,6],[49,50,4],[50,51,6],[51,52,3],
  [52,53,4],[53,54,9],[54,55,11],
  [65,64,19],[64,63,7],[63,62,11],[62,61,14],[61,60,12],[60,59,11],[59,58,12],
  [58,57,11],[57,56,9],[56,55,9],
  [66,36,4],[36,67,4],[67,68,8],
  [69,70,9],[70,71,6],[71,72,6],[72,73,6],[73,74,4],[74,75,2],[75,76,4],[76,77,3],
  [77,78,1],[78,79,2],[79,80,7],[80,81,3],[81,82,1],[82,83,2],[83,84,2],[84,24,8],
  [24,85,2],[85,86,2],[86,87,7],[87,88,1],[88,89,1],[89,90,7],[90,66,3],
  [93,92,10],[92,91,3],[91,72,10],
];

export const LINES: { name: string; color: string; edges: [number, number][] }[] = [
  { name: "Tangerang Line", color: "#E85D24", edges: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10]] },
  { name: "Cikarang Line", color: "#185FA5", edges: [[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,10],[10,29],[22,30],[30,31],[31,32],[32,33],[33,34],[34,35],[35,36],[36,29]] },
  { name: "Rangkasbitung Line", color: "#639922", edges: [[28,37],[37,38],[38,39],[39,40],[40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,47],[47,48],[48,49],[49,50],[50,51],[51,52],[52,53],[53,54],[54,55]] },
  { name: "Merak Line", color: "#8B1A8B", edges: [[65,64],[64,63],[63,62],[62,61],[61,60],[60,59],[59,58],[58,57],[57,56],[56,55]] },
  { name: "Tanjung Priok Line", color: "#D4A017", edges: [[66,36],[36,67],[67,68]] },
  { name: "Bogor Line", color: "#D85A30", edges: [[69,70],[70,71],[71,72],[72,73],[73,74],[74,75],[75,76],[76,77],[77,78],[78,79],[79,80],[80,81],[81,82],[82,83],[83,84],[84,24],[24,85],[85,86],[86,87],[87,88],[88,89],[89,90],[90,66],[93,92],[92,91],[91,72]] },
];

// Sorted station list for dropdowns: [id, name]
export const STATION_LIST: { id: number; name: string }[] = Object.entries(STATIONS)
  .map(([id, name]) => ({ id: Number(id), name }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const MOCK_ROUTE = {
  path: ["Bogor", "Cilebut", "Bojong Gede", "Citayam", "Depok", "Manggarai", "Cikini", "Gondangdia", "Juanda", "Sawah Besar", "Mangga Besar", "Jakarta Kota"],
  totalTime: 48,
  stations: 12,
  transfers: 1,
  fare: 5000,
};

export const ALGO_COMPARISON = [
  { metric: "Runtime", dijkstra: "0.0012 s", bellman: "0.0085 s" },
  { metric: "Memory", dijkstra: "Low", bellman: "Medium" },
  { metric: "Accuracy", dijkstra: "100%", bellman: "100%" },
];

export const PERFORMANCE_DATA = [
  { stations: 5, dijkstra: 0.4, bellman: 1.2 },
  { stations: 10, dijkstra: 0.9, bellman: 3.1 },
  { stations: 20, dijkstra: 2.4, bellman: 11.8 },
  { stations: 30, dijkstra: 4.7, bellman: 29.0 },
  { stations: 50, dijkstra: 10.2, bellman: 78.5 },
  { stations: 75, dijkstra: 18.9, bellman: 175.0 },
  { stations: 94, dijkstra: 27.5, bellman: 268.0 },
];
