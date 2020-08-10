var WebSocketClient = require('websocket').client;
const request = require('request');
const readline = require('readline');
const crypto = require('crypto');
const http = require('http');
const chalk = require('chalk');


var GlobalData = {
	players: [],
	SeenBefore: {},
	worddb: {},
	comment: "discord.gg/aMfzb5S",
	BotNames: "NONE",
	WordCache: {},
	Verbose: false,
	DisconnectAfterAttack: false,
	DefenseMode: false,
	IgnoreList: {
	},
	BotPrefix: "the_",
	MessageAfterHack: "idiot american discord.gg/aMfzb5S",
	StatModeEnabled: false,
	Stats: {
		HackStarted: 0,
		HackFinished: 0,
		BotHacked: 0,
		WordGuessed: 0,
		BotBiggestLevel: 0,
		BotBiggestCoin: 0,
		BotConnected: 0,
		BotDisconnected: 0
	},
	BuyMinerList : {
        0 : "Data",
        1 : "Advanced",
        2 : "Drill",
        3 : "Center",
        4 : "Botnet",
        5 : "Quantum" 
    },
    SetupID: ""
}

var CurrentCommand = "NONE"
var CurrentCommandArgs = {}

const worddb = {
	"disconnectserver"	:	"78bbfcad233d2d4a8e8873f15c2f8779",
	"setnewproxy"	:	"ee7bcc5c79d99468eba1b45c7a1a7a95",
	"bufferpingset"	:	"1386302c93ffd6bd250aa03eaacc7f59",
	"batchallfiles"	:	"ec8f6f20e392708631b78178615684c3",
	"createfilethread"	:	"8f396a6836a1f0a745deb6ab04c26df2",
	"sendintelpass"	:	"9934b13aa38033081cc5d88b85dcec11",
	"create3axisvector"	:	"f98e8f2a5c419a3eb289b37ee6de8b08",
	"systemgridtype"	:	"ee26761fe835ef5626fe570c3cc4ab98",
	"getmysqldomain"	:	"f4fe24216d04e453fd45b1057b49fe49",
	"changepassword"	:	"d70665c9a5d240e881cf97a9825e8258",
	"eventlistdir"	:	"176d36218a56263b289b3db3819fa01d",
	"getxmlprotocol"	:	"ba65a1eb00561d1581a60e5882ad2b68",
	"channelsetpackage"	:	"9aa9681e57d3090461bf7d9b40484f34",
	"getdatapassword"	:	"69a37ca449e5013ea41e085d3a1ff66c",
	"wordcounter"	:	"a23cc99d4abe37ffbe167c689ca5d946",
	"joinnetworkclient"	:	"fd69bda442958308e4d4c48aabbd19f1",
	"createnewpackage"	:	"9bd27a841e84b44459f9ac5b730899b0",
	"getfirewallchannel"	:	"49a4ab7cdfa978cfb2ce29f2b3af2ff2",
	"emitconfiglist"	:	"a41bcbc792f79120f19d3f77fcccb1d7",
	"disconnectchannel"	:	"f7327b90267471324febd77e1a03044b",
	"blockthreat"	:	"36135d7fb55be568c7bf2df15fcb9bf7",
	"loadaltevent"	:	"54321bb10113808547e485232e7df9f1",
	"statusofprocess"	:	"a54166dad8fdefe2cbcdbbeb9fc94427",
	"encodenewfolder"	:	"bca1d30d8c9168b92c40518b1ba8d8ff",
	"removenewcookie"	:	"d4d5ba85c5a7eda5f43e745f516a3a76",
	"loadloggedpassword"	:	"3dcebaf21c839dadc80b2410c28ff2aa",
	"changeusername"	:	"3b235f7b31ae6472aef939a09aa2e413",
	"createnewsocket"	:	"9ac8c96ba1f87a6da0db77c5d7b202a1",
	"decryptdatabatch"	:	"e0544644811a1d4e7e64665f075a3c84",
	"uploaduserstats"	:	"29bd3683d8884dfc8852e6c3c2fba911",
	"systemportkey"	:	"24169d3db38b4d781891c1f745ea573e",
	"loadregisterlist"	:	"dbcfdbf132d1b06f9dae1ec9b72ee361",
	"dodecahedron"	:	"833e854d8fe340552c3395be22279a51",
	"httpbuffersize"	:	"baf1cf875fe2b58ddb782b0f08e62894",
	"getpartoffile"	:	"24c9fd00f095639dc51a4745ff699f2f",
	"patcheventlog"	:	"c82f0e45ac8ca65d3b6f69a873e0e31e",
	"callmodule"	:	"564928aaa801f93d7553300ed08263ff",
	"ghostfilesystem"	:	"3ce2d36ee08b3e6457c7ad5fd649ee12",
	"generatecodepack"	:	"284363d1811c03e2d1fe8ae355e6e0e1",
	"respondertimeout"	:	"007321ee510d9fdb2d5b1c2c30a5a64b",
	"deleteallids"	:	"811b844a499e47830dd4ee8e3b4b31a2",
	"sizeofhexagon"	:	"4b5f9f33b8e482f5e3ced660fdde8916",
	"mergesocket"	:	"a5c108a85e718526c76d8f4921c01c5a",
	"tempdatapass"	:	"38480f87709fc9c7c17febdc86cb7025",
	"rootcookieset"	:	"3f37e708d1dcc9e094c7761a3831dba2",
	"exportconfigpackage"	:	"37c4160932da1157d8724762be81f9b3",
	"fileexpresslog"	:	"2e8bbe859f462dfff05d812902b1f706",
	"removeoldcookie"	:	"07379e52880d8397f165b76dcac2d1f8",
	"includedirectory"	:	"fdcc898624a3eb8b6d0e16c723548e1d",
	"checkhttptype"	:	"93859a5926a774940036f5ab9a70a04d",
	"destroybatch"	:	"0940e711d15a687a976c62452c0d67fc",
	"create2axisvector"	:	"0b281e39246ce021c11ab785db5eacf8",
	"encryptunpackedbatch"	:	"1e76da7131e9187ee643a5e100814726",
	"unpacktmpfile"	:	"e50d87c89c9bac927b89d45b5bd7b258",
	"reset"	:	"09bb05a8dff4cbba53ebbaf23117ee5c",
	"list"	:	"650a2e8ac217c1685a61d2bf2da556a6",
	"bytes"	:	"b90e0668218d0bd9c8e986f9bfb5fffb",
	"pass"	:	"f0821a72f7fd1bb93cd174ce86d2a615",
	"ping"	:	"1828be0b799aa35a0b7e4a9e7c84e63c",
	"intel"	:	"1297519371d5eaf6ceccdbfe770b0594",
	"event"	:	"bdfcba5ecc25b89e7466bff717fe30a7",
	"set"	:	"ed0191d7eee264a696753caed36bdb82",
	"socket"	:	"77b2fd0c9dd99233e016333938422754",
	"val"	:	"d3f88f5a7e95b65a42d927fa958bbd8b",
	"load"	:	"4c13d55be3b70d0d6bba777924ea889d",
	"write"	:	"3bc69c17b60e005beb22e0d479ad6ff0",
	"get"	:	"919d71d49f4b54d435cab7a07953fbc5",
	"cookies"	:	"7c1e97f204892722ddbaada9526092ae",
	"send"	:	"3f2b934a6d4c4f84d52fb1f3d8d958b2",
	"call"	:	"17848cf2b3c29258bf7b4fe72885f0ed",
	"xml"	:	"4b5e4e7f2b7b887edad94a96f9f98dea",
	"upload"	:	"508d58bcf968d378d360fa29b30f37b1",
	"poly"	:	"bbbdb7fffc2951abff968a6102e72735",
	"add"	:	"0c129fc504a7235bd7533cb8be13e34a",
	"loop"	:	"75da2673ec4e90e2b73104258f3ac99c",
	"size"	:	"f41a7f67eb9bfa6865b048fae028e87c",
	"com"	:	"5e9a81ea3e3ee16de099224ccc105cb6",
	"info"	:	"e759e5eee642b4fe0d770f44cb76534e",
	"type"	:	"00cbcc49a38c3e006801f1ba2b733062",
	"stat"	:	"f5ad73d8c4d172323bcf5fd173cd4ffb",
	"log"	:	"7a8ea444dc3c542dae86e927f77a86a9",
	"file"	:	"f3d27d00d4b60c198cbbb1e498fe56d1",
	"ghost"	:	"da5dfe020a8b53dbf4793615432eee16",
	"signal"	:	"97902dbcee35b3b5374c10cee9981a53",
	"key"	:	"635e1598550f992569188169353062e5",
	"data"	:	"6e4532894d8173b6dafd48ae75e72a57",
	"net"	:	"5c8596b0b8242caab4b588a68ea2bec7",
	"client"	:	"176482bf629d8d6758e4b5efcd0c96de",
	"num"	:	"4360a51f8786468809a4a2b8315a0014",
	"temp"	:	"d09bed9265c2b4181c42fa6352cf6f4d",
	"system"	:	"fdb82bdd38793248fde74f0d0effa064",
	"global"	:	"131b794f4faee20352841c9234908fd1",
	"buffer"	:	"03766fe66c894e135f34e4817adcc445",
	"join"	:	"39d82ec961c6a3053d179b60554eed6e",
	"delete"	:	"68f61d61a1a00a45ac38f9b65d0cbc51",
	"right"	:	"583462fd92e52efac8aa13ba5ffbd8a8",
	"anon"	:	"b0e367e6eb9413e5ca0c2cc973deca7f",
	"bit"	:	"d3f137f5665501f40b58b798b5c4b65d",
	"dir"	:	"9d648dd2047b63782bcb071a355ad920",
	"init"	:	"1c56cb8b96c2fcd274666b542aa285ef",
	"http"	:	"9d8fdb42a1a2ac092a81b6c4ad76551a",
	"remove"	:	"f971893d31b4f29da62fe2cc43323137",
	"point"	:	"dc2dabd29466842632e595f318a071ca",
	"status"	:	"13bf57924dec62e9471eadf23443dbee",
	"emit"	:	"9a919cb291d0394a14154088d8bd53ec",
	"domain"	:	"714879b0ce6d6f9ef4ff533b19d40d16",
	"left"	:	"39b8a0150fd284cde2e815833b1e14bd",
	"port"	:	"500835f3ddef813783837074cff034e9",
	"root"	:	"0ff4d83bb8c2d377ef2a5fb106ca397f",
	"host"	:	"eb3fbeb71a325e28f7205768b113894f",
	"count"	:	"ce1a19c462bac5aa9d7f70e557696acb",
	"url"	:	"21db84d3423eb02e7b22c5439f36180f",
	"user"	:	"4b77ccf85264c34e203c17d7dd14fa81",
	"handle"	:	"6c65f9eb81a2cb98eebe0019569b50c6",
	"part"	:	"2a2fcc4c8a9a08d2178cf0e79bcd1602",
	"thread"	:	"16eed3bc6e50dec827961e86304ef833",
	"datatype"	:	"7ff27fa6a319ad5944ef0f0705a20f1f",
	"setstats"	:	"539ca7aec263e4290746a70f32fce505",
	"hexagon"	:	"a94277548a523f854dd6ec4710338388",
	"getkey"	:	"2868de88eabf74a7a2864d080d677a2b",
	"getinfo"	:	"d029bb87ca1d7f1f5e85e15455461450",
	"setnewid"	:	"ace69a4f904481e8026d8eb8e0ec20b0",
	"gridwidth"	:	"f5c52a647592f388cae2a0f190eb1738",
	"fillgrid"	:	"1322c8cc0ed84f80270052ebabb01c66",
	"userid"	:	"84a09fabd86be7fc1626e6c15c203767",
	"getfile"	:	"11c51150aa2b0513f2f8387dfacf326c",
	"command"	:	"d273db76582898ad279ddc916d580f24",
	"syscall"	:	"4ad7c0a40664c32439d713cb037ca000",
	"constructor"	:	"ef09cd3de0e22e349d2a63a4aa7ce9d3",
	"newline"	:	"be5509fa9b005caf93e0fdc9ce71554a",
	"encryptfile"	:	"89907aa34395513e63272687fc987413",
	"generate"	:	"5f27edcf873d7415b4b4e1bcd44c1985",
	"eventtype"	:	"f738270f9f777ff64c8fa321b9bf1a8c",
	"account"	:	"599e550eaede5816f536a0f3ff75ceec",
	"proxy"	:	"beb9143c413c3bd88f8c36b6d0077807",
	"listconfig"	:	"9e09228d0c9c62d72f492f20adca71b6",
	"module"	:	"2202d274d11fbdbd627b48fac002248a",
	"server"	:	"3da0c84d81037995bc4022710555980f",
	"encrypt"	:	"d8ebac615855d4630206073099f219e5",
	"getping"	:	"4645195ca995e87ec7c0b33b7e8b70ab",
	"download"	:	"b0be15d18a861e56197822e5feceb2af",
	"decrypt"	:	"c2934cfd514592adecb7cf23510fb2d6",
	"gridheight"	:	"441333fe1da405980ce4f4c96d956a16",
	"loadbytes"	:	"79d66ce006f86c469053f74cb1fdcc98",
	"writefile"	:	"644c0ab87adca4955faaef16da818cde",
	"password"	:	"3c46ecdb1ee31734089b65ef8f51a216",
	"getpass"	:	"5e7b782f27b8bb2b9c7795e1bf6d45cd",
	"protocol"	:	"5bf5335ae3c0d6340dd5cf1cb58a4ec1",
	"process"	:	"4d81cd01f140000e260fec15a94b5339",
	"number"	:	"8552e6d7d7a40ed0017587e64d9c4df7",
	"connect"	:	"c0c984850e68d6fd4d3a6d0e7d2b69b1",
	"filedir"	:	"c25304fa6c882380a016f080f30c76ee",
	"serverproxy"	:	"9365c061ea222b302e28761204720f94",
	"threat"	:	"ad3e41feff5116e4ff11c482a604f68f",
	"mysql"	:	"08005a180c3bafc2fccc7c306669c59d",
	"package"	:	"f35c70b6606ee1321457b7fe3403e590",
	"newserver"	:	"6f064e7073dd138b29754e31a7306fb6",
	"config"	:	"8750047d1fb8b493547c9d0bdad166d9",
	"response"	:	"9193a4e8dc1901371b7a21e1a04f28a8",
	"encode"	:	"7743a63dae2bc5d77680ec6f29b1121c",
	"getid"	:	"d516479c7f5b6211fa967ce5228051ad",
	"disconnect"	:	"75b62d012a0c91f18041a41f2cd361bf",
	"filetype"	:	"b9525d0b47b293c8aad8000dfd59ea8c",
	"newhost"	:	"1b8666224bbc6cb6e72873bff3be5247",
	"export"	:	"eb380ee70bc0ebefe5fbf4e8aaffe621",
	"length"	:	"cb8f0637d779760e4ba7263f268332e1",
	"accountname"	:	"c2a17266003a1bec63ed26b287c5342f",
	"urlcheck"	:	"fcb86a77dffcd0d4e01b230e9126f3f7",
	"userport"	:	"de43f98e56db9d8593be2b90d789a47f",
	"setcookie"	:	"2cf69218240efaf85a182c298fc1151f",
	"findpackage"	:	"aef0c2e3947e6067ef6c6ca9cd10f7a0",
	"getlog"	:	"3ba883e7bd2b80a819e269c8ba263c58",
	"responder"	:	"162abae0f24ad00c68b01e74fc6e7f5d",
	"vector"	:	"02201017cedae660ff25b90975679c02",
	"sizeof"	:	"52a668de8012faf29cd93ee9095e4814",
	"setport"	:	"dd979e7fc33ac1c998ea776e2daf9346",
	"hostnewserver"	:	"d56b37a0aaf25e5c87b1976ab9d113b9",
	"decryptfile"	:	"8839774e66404e197c5e201ae3435165",
	"username"	:	"94d610495fa8b14d47a45f750a8bc2b3",
	"setping"	:	"f79d9ac962efeb4274c74f0b136cba0d",
	"channel"	:	"59c5764c4da1fbb7c775663eb487cd85"
	}

setInterval(()=>{
	GlobalData.WordCache = {}
}, 60000)
console.log("Wordlist contains " + Object.keys(worddb).length + " words")
for (var i = 0; i < Object.keys(worddb).length; i++) {
	var _key  = Object.keys(worddb)[i]
	var _prop = worddb[_key]
	GlobalData.worddb[_prop] = _key
}
GlobalData.worddb["49f57735c8c000411d1550ede087f286"] = "add"
GlobalData.worddb["9e82cc12241d7c090765f7951f7784b2"] = "hostnewserver"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function rngint(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function CurTime() {
	return new Date().getTime() / 1000;
}

const CreateClient = (sid, data) => {
	if(data.name == "?")
		data.name = GlobalData.BotPrefix + rngint(11111111, 99999999)
	var client = new WebSocketClient();
	var LocalData = {id: "NONE", isBusy: false, DontRequestImageData: false, IntervalId: 0, LastWordTime: 0, LocalTargetList: [], WorkingID: "", SeenBefore: {}, SeenBeforeUpdate: 0}
	client.on('connect', function(connection) {
	    connection.on('error', function(error) {
	        console.log(chalk.red("Connection error: " + error.toString()));
	    });
	    connection.on('close', function() {
	    	clearInterval(LocalData.IntervalId)
	    	GlobalData.Stats.BotDisconnected++
	    	if(GlobalData.Verbose)
	        	console.log(chalk.red("Connection closed for bot " + data.name));
	    });
	    connection.on('message', function(message) {
	        if (message.type === 'utf8') {
	        	if(!IsJsonString(message.utf8Data.substring(2)))
	        	return;
	        		var MainPackage = JSON.parse(message.utf8Data.substring(2))[1]
	        		if(MainPackage.id){
		        		LocalData.id = MainPackage.id
		        		GlobalData.Stats.BotConnected++
		        		if(GlobalData.Verbose)
		        			console.log(chalk.green("Bot \"" + data.name + "\" received his ID (" + LocalData.id + ")"));
		        		return;
		        	}

		        	for (var i = 0; i < MainPackage.unique.length; i++) {
		        		let dData = MainPackage.unique[i]
		        		if(typeof dData.data !== "undefined")
		        		{
			        		if(dData.data || dData.data.length || dData.data.length > 4 || dData.task == 2008)
			        		{
				        		GlobalData.players = dData.data
				        		LocalData.LocalTargetList = dData.data
				        		LocalData.SeenBeforeUpdate++
				        		if(LocalData.SeenBeforeUpdate != 32)
				        			continue
				        		LocalData.SeenBeforeUpdate = 0
				        		var safe = 0
				        		for (var y = 0; y < dData.data.length; y++) {
				        			if(safe > 20)
				        				break
				        			GlobalData.SeenBefore[dData.data[y].name] = dData.data[y]
				        			safe++;
				        		}
				        	}
				        }
		        		if(dData.task == 2000)
		        		{
		        			if(dData.data.id)
		        			{
			        			console.log(chalk.red("Bot " + data.name + " is being attack by " + dData.data.name + " (" + dData.data.id + ") on port " + dData.data.port))
			        			GlobalData.Stats.BotHacked++
			        			if(GlobalData.DefenseMode)
			        			{
			        				CurrentCommand = "attack"
									CurrentCommandArgs.id = dData.data.id
									CurrentCommandArgs.port = "?"
									console.log(chalk.red(dData.data.name + " attacked us, let's attack him !"))
			        			}
			        		}
		        		}
		        		if(dData.task == 2006)
		        		{
		        			if(dData.name)
		        			{
		        				if(dData.message == "iqQuit"){
			        				process.exit(1)
			        				return;
		        				}
		        				if(dData.message == "iqIgnoreme"){
			        				GlobalData.IgnoreList[dData.id] = true
			        				return;
		        				}
		        				if(dData.message == "iqDontignoreme"){
			        				GlobalData.IgnoreList[dData.id] = false
			        				return;
		        				}
		        				if(dData.message == "iqAttackme"){
			        				CurrentCommand = "attack"
									CurrentCommandArgs.id = dData.id
									CurrentCommandArgs.port = "?"
			        				return;
		        				}
		        				if(dData.message == "iqHathack"){
			        				CurrentCommand = "hathack"
									CurrentCommandArgs.id = dData.id
									CurrentCommandArgs.port = "?"
			        				return;
		        				}
		        				if(dData.message == "iqHathack"){
			        				CurrentCommand = "hathack"
									CurrentCommandArgs.id = dData.id
									CurrentCommandArgs.port = "?"
			        				return;
		        				}
			        			console.log(chalk.blue(dData.name + "(" + dData.id + ") -> " + data.name + " : " + dData.message))
			        			
			        		}
		        		}
		        		if(dData.task == 2009)
		        		{
		        			if(dData.content && dData.content.level)
		        			{
		        				if(GlobalData.Stats.BotBiggestLevel < dData.content.level)
		        					GlobalData.Stats.BotBiggestLevel = dData.content.level
			        		}
		        		}
		        		if(dData.task == 2010)
		        		{
		        			if(dData.data && dData.data.coins && dData.data.coins.value)
		        			{
		        				if(GlobalData.Stats.BotBiggestLevel < dData.data.coins.value)
		        					GlobalData.Stats.BotBiggestCoin = dData.data.coins.value
			        		}
		        		}
		        		
		        		
		        		if(dData.task == 2003){
		        			LocalData.isBusy = false
		        			console.log(chalk.blue("Bot " + data.name + " finished his attack !"))
		        			GlobalData.Stats.HackFinished++
		        			SendComment(GlobalData.comment)
		        			if(GlobalData.MessageAfterHack != "")
		        				SendMessage(LocalData.WorkingID, GlobalData.MessageAfterHack)
		        			if(GlobalData.DisconnectAfterAttack)
		        			{
		        				LocalData.isBusy = true
		    					setTimeout(()=>{
		    						clearInterval(LocalData.IntervalId)
		    						connection.close()
									MakeNewClient(GlobalData.BotNames)
								}, 500)
		    				}
	    					return;
		        		}
		        		if(dData.task == 333){
		        			LocalData.LastWordTime = CurTime()
		        			if(LocalData.DontRequestImageData)
		        				return;
		        			if(!dData.url || !dData.url.t || !dData.url.i)
		        				return;
		        			if(GlobalData.WordCache[dData.url.t+dData.url.i])
		        			{
		        				send("42" + JSON.stringify(["playerRequest",{"task":777,"word":GlobalData.WordCache[dData.url.t+dData.url.i]}]))
		        				return
		        			}
		        			var url = "http://s0urce.io/client/img/word/"+dData.url.t+"/"+dData.url.i
		        			

							
							  	var hash = crypto.createHash("md5");
								hash.setEncoding("hex");
								request(url).pipe(hash);
								hash.on("finish", function(){
								    hash.end();
								    var md5data = hash.read();
									if(GlobalData.worddb[md5data] === undefined)
									{
										console.log(chalk.red("Word list does not contain word " + md5data + " : " + dData.url.t+"/"+dData.url.i));
										console.log(GlobalData.worddb.hasOwnProperty(md5data))
									}else{
										//console.log(chalk.green("Word: " + GlobalData.worddb[md5data]));
										send("42" + JSON.stringify(["playerRequest",{"task":777,"word":GlobalData.worddb[md5data]}]))
										if(!dData.url || !dData.url.t || !dData.url.i)
		        							return;
										GlobalData.WordCache[dData.url.t+dData.url.i] = GlobalData.worddb[md5data]
										GlobalData.Stats.WordGuessed++;
									}

								});
							  
							
		        	}

	
		        }
		        	
		        	
		    }
	            //console.log("Received: '" + message.utf8Data + "'");
	        
	    });
	    
	    function send(data) {
	        if (connection.connected) {
	            connection.sendUTF(data);
	        }
	    }
	    function ChangeDescription(newdesc) {
	    	send("42" + JSON.stringify(["playerRequest",{"task":104,"desc":newdesc}]))
	    }
	    function SendMessage(id, message) {
	    	send("42" + JSON.stringify(["playerRequest",{"task":300,"id":id,"message":message}]))
	    }
	    function StartHack(id, port) {
	    	if(port == "?")
	    		port = rngint(0, 3)
	    	LocalData.WorkingID = id
	    	send("42" + JSON.stringify(["playerRequest",{"task":100,"id":id,"port":port}]))
	    	LocalData.LastWordTime = CurTime()
	    	GlobalData.Stats.HackStarted++

	    }
	    function ResetBot() {
	    	send("42" + JSON.stringify(["playerRequest",{"task":666}]))
	    }
	    function SendComment(message) {
	    	send("42" + JSON.stringify(["playerRequest",{"task":106,"text":message}]))
	    }
	    function BuyMiner(id) {
	    	send("42" + JSON.stringify(["playerRequest",{"task":103,"id":id}]))
	    }
	    setTimeout(()=> {send("2probe")}, 1)
	    setTimeout(()=> {send("5")}, 10)
	    if(!data.donotsignin){
	    	setTimeout(()=> {send("42" + JSON.stringify(["signIn",{"name":data.name}]))}, 20)
	    }else{
	    	console.log("Bot will not log in")
	    }
	    LocalData.IntervalId = setInterval(()=>{
	    	send("2")
	    	if(LocalData.LastWordTime != 0)
		    	if(CurTime() - LocalData.LastWordTime > 2)
		    	{
		    		if(GlobalData.DisconnectAfterAttack)
		        	{
		    			clearInterval(LocalData.IntervalId)
	    				connection.close()
	    				setTimeout(()=>{MakeNewClient(GlobalData.BotNames)}, 500)
	    			}else{
	    				LocalData.isBusy = false

	    			}
		    	}
	    	if(LocalData.isBusy)
	    		return false;
	    	if(CurrentCommand == "attack")
	    	{
	    		StartHack(CurrentCommandArgs.id, CurrentCommandArgs.port)
	    		LocalData.isBusy = true
	    		LocalData.DontRequestImageData = false
	    	}
	    	if(CurrentCommand == "spamattack")
	    	{
	    		StartHack(CurrentCommandArgs.id, CurrentCommandArgs.port)
	    		LocalData.isBusy = false
	    		LocalData.DontRequestImageData = true
	    	}
	    	if(CurrentCommand == "msg")
	    	{
	    		SendMessage(CurrentCommandArgs.id, CurrentCommandArgs.message)
	    		LocalData.isBusy = false
	    	}
	    	if(CurrentCommand == "leave")
	    	{
	    		clearInterval(LocalData.IntervalId)
	    		connection.close()
	    	}
	    	if(CurrentCommand == "reset")
	    	{
	    		ResetBot()
	    	}
	    	if(CurrentCommand == "setdesc")
	    	{
	    		ChangeDescription(CurrentCommandArgs.desc)
	    	}
	    	if(CurrentCommand == "buyminer")
	    	{
	    		BuyMiner(CurrentCommandArgs.id)
	    	}
			if(CurrentCommand == "hathack")
	    	{
	    		if(!LocalData.LocalTargetList)
	    			return
	    		var PlayerList = []
	    			var sbKeys = Object.keys(GlobalData.SeenBefore)
	    			if(sbKeys.length > 3)
	    			{
	    				sbKeys.forEach((y)=>{
	    					PlayerList.push({name: y, id: GlobalData.SeenBefore[y].id})
	    				})
	    			}else{
	    				PlayerList = LocalData.LocalTargetList
	    			}
	    		var safe = 0
	    		while(safe <= 15)
	    		{
		    		var ply = PlayerList[Math.floor(Math.random() * PlayerList.length)]
		    		if(ply && ply.id && !ply.name.startsWith(GlobalData.BotPrefix) && !GlobalData.IgnoreList[ply.id])
		    		{
		    			StartHack(ply.id, "?")
		    			console.log(chalk.green("HAT-HACK " + data.name + " -> " + ply.name))
		    			LocalData.isBusy = true
		    			break;
		    		}
		    		safe++
		    	}
	    	}
	    	
	    	if(CurrentCommand == "NONE")
	    	{
	    		LocalData.isBusy = false
	    	}
	    }, 1000 + rngint(0, 405))
	    //;
	});
	 
	client.connect('ws://s0urce.io/socket.io/?EIO=3&transport=websocket&sid=' + sid);
}
function MakeNewClient(name) {
	if(GlobalData.SetupID != "")
	{
		CreateClient(GlobalData.SetupID, {name: name, donotsignin: false})
		return
	}
	request('http://s0urce.io/socket.io/?EIO=3&transport=polling&t=N93G-0f', function (error, response, body) {
		var SocketInfo = JSON.parse(body.substring(5))
		CreateClient(SocketInfo.sid, {name: name, donotsignin: false})
	});
}


setInterval(()=>{
	if(!GlobalData.StatModeEnabled)
		return;
	var s = GlobalData.Stats;
	console.clear() //GlobalData.Stats
	console.log("---------------------------------")
	console.log(chalk.blue("Hack started:  ") + chalk.green(s.HackStarted));
	console.log(chalk.blue("Hack finished: ") + chalk.green(s.HackFinished + "(" + s.HackFinished / s.HackStarted * 100 + "%)"));
	console.log(chalk.blue("Bot hacked:    ") + chalk.green(s.BotHacked));
	console.log(chalk.blue("Words guessed: ") + chalk.green(s.WordGuessed));
	console.log(chalk.blue("Highest level: ") + chalk.green(s.BotBiggestLevel));
	console.log(chalk.blue("Highest coins: ") + chalk.green(s.BotBiggestCoin));
	console.log(chalk.blue("Connected bots:") + chalk.green(s.BotConnected - s.BotDisconnected + "(" + s.BotConnected + "-" + s.BotDisconnected + ")"));
	console.log("- - - - - - - - - - - - - - - - -")
	console.log(chalk.blue("Player in list:") + chalk.green(GlobalData.players.length));
	console.log(chalk.blue("SeenBefore:    ") + chalk.green(Object.keys(GlobalData.SeenBefore).length));
	console.log(chalk.blue("Word in cache: ") + chalk.green(Object.keys(GlobalData.WordCache).length));
	console.log("---------------------------------")
}, 250)

rl.on('line', (input) => {
	input = input.split(' ');
	if(input[0] == "newbot"){
		if(input[2])
		{
			console.log(chalk.green("Creating " + parseInt(input[2]) + " bots"));
			for (var i = 0; i < parseInt(input[2]); i++) {
				MakeNewClient(input[1])
			}
		}else{
			console.log(chalk.green("Creating a bot"));
			MakeNewClient(input[1])
		}
		GlobalData.BotNames = input[1]
	}
	if(input[0] == "s")
	{
		GlobalData.StatModeEnabled = !GlobalData.StatModeEnabled
	}
	if(input[0] == "attack")
	{
		CurrentCommand = "attack"
		CurrentCommandArgs.id = input[1]
		CurrentCommandArgs.port = input[2]
		console.log(chalk.red('Attack started'));
	}
	if(input[0] == "spamattack")
	{
		CurrentCommand = "spamattack"
		CurrentCommandArgs.id = input[1]
		CurrentCommandArgs.port = input[2]
		console.log(chalk.red('Attack spamming started'));
	}
	if(input[0] == "msg")
	{
		CurrentCommand = "msg"
		CurrentCommandArgs.id = input[1]
		input[0] = ""
		input[1] = ""
		CurrentCommandArgs.message = input.join(' ')
		console.log(chalk.red('Message spamming started'));
	}
	if(input[0] == "players")
	{
		console.log("List of tops players and IDs")
		for (var i = 0; i < GlobalData.players.length; i++) {
		    var ply = GlobalData.players[i];
		    console.log(ply.name + ": " + ply.id + " | " + ply.comm.first + " | " + ply.comm.second)

		}
	}
	if(input[0] == "stop")
	{
		console.log(chalk.green('Current action stopped'));
		CurrentCommand = "NONE"
		CurrentCommandArgs = {}
	}
	if(input[0] == "leave")
	{
		console.log(chalk.green('All bots left'));
		CurrentCommand = "leave"
	}
	if(input[0] == "reset")
	{
		console.log(chalk.blue('All bots reseted'));
		CurrentCommand = "reset"
	}
	if(input[0] == "setdesc")
	{
		console.log(chalk.green('All bots descriptions has been changed'));
		CurrentCommand = "setdesc"
		input[0] = ""
		CurrentCommandArgs.desc = input.join(' ')
	}
	if(input[0] == "hathack")
	{
		console.log(chalk.green('Hack everyone'));
		CurrentCommand = "hathack"
	}
	if(input[0] == "buyminer")
	{
		console.log(chalk.green('All bots will buy miner ' + GlobalData.BuyMinerList[input[1]]));
		CurrentCommand = "buyminer"
		CurrentCommandArgs.id = parseInt(input[0])
	}
	if(input[0] == "setcomment")
	{
		console.log(chalk.green('Hacked comment set'));
		input[0] = ""
		GlobalData.comment = input.join(' ')
	}
	if(input[0] == "pamsg")
	{
		console.log(chalk.green('Post attack message changed'));
		input[0] = ""
		GlobalData.MessageAfterHack = input.join(' ')
	}
	if(input[0] == "dm")
	{
		console.log(chalk.green('Defense mode set to ' + input[1]));
		if(input[1] == "yes")
			GlobalData.DefenseMode = true
		else
			GlobalData.DefenseMode = false
	}
	if(input[0] == "prefix")
	{
		console.log(chalk.green('Bot prefix set to ' + input[1]));
		GlobalData.BotPrefix = input[1];
	}
	if(input[0] == "ignore")
	{
		console.log(chalk.green('Player ' + input[1] + " will be ignored"));
		GlobalData.IgnoreList[input[1]] = true
	}
	if(input[0] == "seenbefore")
	{
		console.log("List of players seen before")
		console.log(GlobalData.SeenBefore)
	}
	if(input[0] == "ignored")
	{
		console.log("List of players ignored")
		console.log(GlobalData.IgnoreList)
	}
	if(input[0] == "help")
	{
		console.log(chalk.green('List of commands:'));
		console.log(chalk.green('newbot name(or ?) [number of bots] | Create new bots'));
		console.log(chalk.green('attack id port(or ?) | Attack'));
		console.log(chalk.green('spamattack id port(or ?) | Spam attack logs'));
		console.log(chalk.green('msg id message | Message spam'));
		console.log(chalk.green('leave | Make all bots leave'));
		console.log(chalk.green('reset | Reset all bots'));
		console.log(chalk.green('buyminer id | Make bots buy miners'));
		console.log(chalk.green('setdesc desc | Set bots description'));
		console.log(chalk.green('players | Show known players list and ID'));
		console.log(chalk.green('stop | Stop the current action'));
		console.log(chalk.green('setcomment comment | Set hacked comment'));
		console.log(chalk.green('dm yes/no | Set defense mode'));
		console.log(chalk.green('hathack | Hack everyone on target list'));
		console.log(chalk.green('prefix botprefix | Set bot prefix for use with \"?\"'));
		console.log(chalk.green('pamsg message | Send this message after you hacked someone'));
		console.log(chalk.green('ignore ID | Ignore this player when using hathack'));
	}
});

console.log(chalk.green('QWAKBOT is loaded !'));
console.log(chalk.blue('type \"help\" for help'));

