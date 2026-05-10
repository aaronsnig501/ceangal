/**
 * Ceangal — puzzle data
 *
 * Structure:
 *   export const allPuzzles = [{ id, title, categories }]
 *   categories: [{ name, color: 't1'|'t2'|'t3'|'t4', words: [{ w, t }] }]
 *     w = Irish word/phrase
 *     t = English translation (shown only when GA→EN toggle is on)
 *
 * getTodaysPuzzle() returns the puzzle for today based on launch date offset.
 * getPuzzleById(id) returns a specific puzzle by id.
 */
 
export const allPuzzles = [
  {
    id: 1,
    title: "Sa Chaife",
    categories: [
      {
        name: "Deochanna",
        color: "t1",
        words: [
          { w: "Caife", t: "Coffee" },
          { w: "Tae", t: "Tea" },
          { w: "Uisce", t: "Water" },
          { w: "Sú oráiste", t: "Orange juice" },
        ],
      },
      {
        name: "Bia milis",
        color: "t2",
        words: [
          { w: "Toirtín", t: "Muffin" },
          { w: "Cáca", t: "Cake" },
          { w: "Brioscaí", t: "Biscuits" },
          { w: "Scón", t: "Scone" },
        ],
      },
      {
        name: "Ag ordú",
        color: "t3",
        words: [
          { w: "Le do thoil", t: "Please" },
          { w: "Go raibh maith agat", t: "Thank you" },
          { w: "An féidir liom?", t: "May I?" },
          { w: "An bille", t: "The bill" },
        ],
      },
      {
        name: "Roghanna cupáin",
        color: "t4",
        words: [
          { w: "Anseo", t: "To stay in" },
          { w: "Le tabhairt leat", t: "To take away" },
          { w: "Cupán mór", t: "Large cup" },
          { w: "Bainne coirce", t: "Oat milk" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Beannachtaí",
    categories: [
      {
        name: "Beannachtaí bunúsacha",
        color: "t1",
        words: [
          { w: "Dia duit", t: "Hello" },
          { w: "Dia is Muire duit", t: "Hello in reply" },
          { w: "Haigh", t: "Hi" },
          { w: "Fáilte", t: "Welcome" },
        ],
      },
      {
        name: "Fiafraí de dhuine",
        color: "t2",
        words: [
          { w: "Conas atá tú?", t: "How are you?" },
          { w: "Cén chaoi a bhfuil tú?", t: "How are you?" },
          { w: "Cad é mar atá tú?", t: "How are you?" },
          { w: "An bhfuil tú go maith?", t: "Are you well?" },
        ],
      },
      {
        name: "Freagraí dearfacha",
        color: "t3",
        words: [
          { w: "Tá mé go maith", t: "I am well" },
          { w: "Ar fheabhas", t: "Excellent" },
          { w: "Go breá", t: "Fine" },
          { w: "Ní dona", t: "Not bad" },
        ],
      },
      {
        name: "Slán a fhágáil",
        color: "t4",
        words: [
          { w: "Slán", t: "Goodbye" },
          { w: "Slán go fóill", t: "Goodbye for now" },
          { w: "Feicfidh mé thú", t: "I will see you" },
          { w: "Oíche mhaith", t: "Good night" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "An CLG",
    categories: [
      {
        name: "Spóirt an CLG",
        color: "t1",
        words: [
          { w: "Peil Ghaelach", t: "Gaelic football" },
          { w: "Iománaíocht", t: "Hurling" },
          { w: "Camógaíocht", t: "Camogie" },
          { w: "Liathróid láimhe", t: "Handball" },
        ],
      },
      {
        name: "Daoine ar an bpáirc",
        color: "t2",
        words: [
          { w: "Imreoir", t: "Player" },
          { w: "Réiteoir", t: "Referee" },
          { w: "Cúl báire", t: "Goalkeeper" },
          { w: "Captaen", t: "Captain" },
        ],
      },
      {
        name: "Scóráil",
        color: "t3",
        words: [
          { w: "Cúl", t: "Goal" },
          { w: "Cúilín", t: "Point" },
          { w: "Cic saor", t: "Free kick" },
          { w: "Poc saor", t: "Free puck" },
        ],
      },
      {
        name: "Áiteanna CLG",
        color: "t4",
        words: [
          { w: "Páirc an Chrócaigh", t: "Croke Park" },
          { w: "Staidiam", t: "Stadium" },
          { w: "Seomra feistis", t: "Dressing room" },
          { w: "Taobhlíne", t: "Sideline" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Oíche Shamhna",
    categories: [
      {
        name: "Rudaí scanrúla",
        color: "t1",
        words: [
          { w: "Taibhse", t: "Ghost" },
          { w: "Cailleach", t: "Witch" },
          { w: "Cnámharlach", t: "Skeleton" },
          { w: "Arracht", t: "Monster" },
        ],
      },
      {
        name: "Maisiúcháin",
        color: "t2",
        words: [
          { w: "Puimcín", t: "Pumpkin" },
          { w: "Coinneal", t: "Candle" },
          { w: "Masc", t: "Mask" },
          { w: "Culaith", t: "Costume" },
        ],
      },
      {
        name: "Gníomhartha na hoíche",
        color: "t3",
        words: [
          { w: "Ag cnagadh", t: "Knocking" },
          { w: "Ag scanrú", t: "Scaring" },
          { w: "Ag ceilt", t: "Hiding" },
          { w: "Ag gléasadh suas", t: "Dressing up" },
        ],
      },
      {
        name: "Milseáin",
        color: "t4",
        words: [
          { w: "Seacláid", t: "Chocolate" },
          { w: "Milseáin", t: "Sweets" },
          { w: "Úll taifí", t: "Toffee apple" },
          { w: "Cnónna", t: "Nuts" },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Logainmneacha Laighean",
    categories: [
      {
        name: "Contaetha Laighean",
        color: "t1",
        words: [
          { w: "Baile Átha Cliath", t: "Dublin" },
          { w: "Cill Dara", t: "Kildare" },
          { w: "Cill Mhantáin", t: "Wicklow" },
          { w: "An Mhí", t: "Meath" },
        ],
      },
      {
        name: "Bailte móra",
        color: "t2",
        words: [
          { w: "Droichead Átha", t: "Drogheda" },
          { w: "Port Laoise", t: "Portlaoise" },
          { w: "Inis Córthaidh", t: "Enniscorthy" },
          { w: "Ceatharlach", t: "Carlow" },
        ],
      },
      {
        name: "Áiteanna cois farraige",
        color: "t3",
        words: [
          { w: "Bré", t: "Bray" },
          { w: "Dún Laoghaire", t: "Dún Laoghaire" },
          { w: "An Ros Láir", t: "Rosslare" },
          { w: "Inbhear Mór", t: "Arklow" },
        ],
      },
      {
        name: "Logainmneacha le Cill",
        color: "t4",
        words: [
          { w: "Cill Chainnigh", t: "Kilkenny" },
          { w: "Cill Mhór", t: "Kilmore" },
          { w: "Cill Bheagáin", t: "Kilbeggan" },
          { w: "Cill Choca", t: "Kilcock" },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Bia na hÉireann",
    categories: [
      {
        name: "Béilí traidisiúnta",
        color: "t1",
        words: [
          { w: "Stobhach", t: "Stew" },
          { w: "Bacstaí", t: "Boxty" },
          { w: "Cál ceannann", t: "Colcannon" },
          { w: "Arán sóide", t: "Soda bread" },
        ],
      },
      {
        name: "Bia mara",
        color: "t2",
        words: [
          { w: "Bradán", t: "Salmon" },
          { w: "Oisrí", t: "Oysters" },
          { w: "Diúilicíní", t: "Mussels" },
          { w: "Portán", t: "Crab" },
        ],
      },
      {
        name: "Sa bhricfeasta",
        color: "t3",
        words: [
          { w: "Ubh", t: "Egg" },
          { w: "Ispíní", t: "Sausages" },
          { w: "Bagún", t: "Bacon" },
          { w: "Pónairí", t: "Beans" },
        ],
      },
      {
        name: "Comhábhair",
        color: "t4",
        words: [
          { w: "Prátaí", t: "Potatoes" },
          { w: "Im", t: "Butter" },
          { w: "Bainne", t: "Milk" },
          { w: "Plúr", t: "Flour" },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "An Aimsir",
    categories: [
      {
        name: "Báisteach agus scamall",
        color: "t1",
        words: [
          { w: "Báisteach", t: "Rain" },
          { w: "Ceobhrán", t: "Drizzle" },
          { w: "Scamall", t: "Cloud" },
          { w: "Cith", t: "Shower" },
        ],
      },
      {
        name: "Fuar",
        color: "t2",
        words: [
          { w: "Sneachta", t: "Snow" },
          { w: "Sioc", t: "Frost" },
          { w: "Oighear", t: "Ice" },
          { w: "Fuacht", t: "Cold" },
        ],
      },
      {
        name: "Te agus geal",
        color: "t3",
        words: [
          { w: "Grian", t: "Sun" },
          { w: "Teas", t: "Heat" },
          { w: "Spéir ghlan", t: "Clear sky" },
          { w: "Bogha báistí", t: "Rainbow" },
        ],
      },
      {
        name: "Gaoth",
        color: "t4",
        words: [
          { w: "Gaoth", t: "Wind" },
          { w: "Stoirm", t: "Storm" },
          { w: "Séideán", t: "Gust" },
          { w: "Gála", t: "Gale" },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "An Teaghlach",
    categories: [
      {
        name: "Tuismitheoirí agus páistí",
        color: "t1",
        words: [
          { w: "Máthair", t: "Mother" },
          { w: "Athair", t: "Father" },
          { w: "Iníon", t: "Daughter" },
          { w: "Mac", t: "Son" },
        ],
      },
      {
        name: "Siblíní",
        color: "t2",
        words: [
          { w: "Deirfiúr", t: "Sister" },
          { w: "Deartháir", t: "Brother" },
          { w: "Leathdheirfiúr", t: "Half-sister" },
          { w: "Leathdheartháir", t: "Half-brother" },
        ],
      },
      {
        name: "Seantuismitheoirí",
        color: "t3",
        words: [
          { w: "Seanmháthair", t: "Grandmother" },
          { w: "Seanathair", t: "Grandfather" },
          { w: "Garmhac", t: "Grandson" },
          { w: "Gariníon", t: "Granddaughter" },
        ],
      },
      {
        name: "Gaolta eile",
        color: "t4",
        words: [
          { w: "Aintín", t: "Aunt" },
          { w: "Uncail", t: "Uncle" },
          { w: "Col ceathrar", t: "Cousin" },
          { w: "Neacht", t: "Niece" },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Ceoil na hÉireann",
    categories: [
      {
        name: "Uirlisí traidisiúnta",
        color: "t1",
        words: [
          { w: "Fidil", t: "Fiddle" },
          { w: "Feadóg stáin", t: "Tin whistle" },
          { w: "Bodhrán", t: "Bodhrán" },
          { w: "Píobaí uilleann", t: "Uilleann pipes" },
        ],
      },
      {
        name: "Cineálacha ceoil",
        color: "t2",
        words: [
          { w: "Port", t: "Jig" },
          { w: "Ríl", t: "Reel" },
          { w: "Amhrán", t: "Song" },
          { w: "Caoineadh", t: "Lament" },
        ],
      },
      {
        name: "Daoine sa seisiún",
        color: "t3",
        words: [
          { w: "Ceoltóir", t: "Musician" },
          { w: "Amhránaí", t: "Singer" },
          { w: "Rinceoir", t: "Dancer" },
          { w: "Éisteoir", t: "Listener" },
        ],
      },
      {
        name: "Sa cheoláras",
        color: "t4",
        words: [
          { w: "Ardán", t: "Stage" },
          { w: "Micreafón", t: "Microphone" },
          { w: "Ticéad", t: "Ticket" },
          { w: "Bualadh bos", t: "Applause" },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Ag Obair",
    categories: [
      {
        name: "Áiteanna oibre",
        color: "t1",
        words: [
          { w: "Oifig", t: "Office" },
          { w: "Siopa", t: "Shop" },
          { w: "Monarcha", t: "Factory" },
          { w: "Feirm", t: "Farm" },
        ],
      },
      {
        name: "Gairmeacha",
        color: "t2",
        words: [
          { w: "Múinteoir", t: "Teacher" },
          { w: "Dochtúir", t: "Doctor" },
          { w: "Innealtóir", t: "Engineer" },
          { w: "Cócaire", t: "Cook" },
        ],
      },
      {
        name: "Sa ríomhaire",
        color: "t3",
        words: [
          { w: "Ríomhphost", t: "Email" },
          { w: "Cruinniú", t: "Meeting" },
          { w: "Scarbhileog", t: "Spreadsheet" },
          { w: "Pasfhocal", t: "Password" },
        ],
      },
      {
        name: "Am oibre",
        color: "t4",
        words: [
          { w: "Tús", t: "Start" },
          { w: "Sos", t: "Break" },
          { w: "Spriocdháta", t: "Deadline" },
          { w: "Tuarastal", t: "Salary" },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Na Dathanna",
    categories: [
      {
        name: "Dathanna coitianta",
        color: "t1",
        words: [
          { w: "Dearg", t: "Red" },
          { w: "Gorm", t: "Blue" },
          { w: "Glas", t: "Green" },
          { w: "Buí", t: "Yellow" },
        ],
      },
      {
        name: "Dathanna eile",
        color: "t2",
        words: [
          { w: "Corcra", t: "Purple" },
          { w: "Oráiste", t: "Orange" },
          { w: "Bándearg", t: "Pink" },
          { w: "Donn", t: "Brown" },
        ],
      },
      {
        name: "Solas agus dorchadas",
        color: "t3",
        words: [
          { w: "Bán", t: "White" },
          { w: "Dubh", t: "Black" },
          { w: "Liath", t: "Grey" },
          { w: "Geal", t: "Bright" },
        ],
      },
      {
        name: "Cur síos ar dhath",
        color: "t4",
        words: [
          { w: "Éadrom", t: "Light" },
          { w: "Dorcha", t: "Dark" },
          { w: "Lonrach", t: "Shiny" },
          { w: "Breac", t: "Speckled" },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "An Músaem",
    categories: [
      {
        name: "Rudaí le feiceáil",
        color: "t1",
        words: [
          { w: "Pictiúr", t: "Picture" },
          { w: "Dealbh", t: "Sculpture" },
          { w: "Léarscáil", t: "Map" },
          { w: "Déantán", t: "Artefact" },
        ],
      },
      {
        name: "Daoine sa mhúsaem",
        color: "t2",
        words: [
          { w: "Cuairteoir", t: "Visitor" },
          { w: "Treoraí", t: "Guide" },
          { w: "Coimeádaí", t: "Curator" },
          { w: "Ealaíontóir", t: "Artist" },
        ],
      },
      {
        name: "Áiteanna istigh",
        color: "t3",
        words: [
          { w: "Gailearaí", t: "Gallery" },
          { w: "Taispeántas", t: "Exhibition" },
          { w: "Siopa bronntanas", t: "Gift shop" },
          { w: "Caifé", t: "Café" },
        ],
      },
      {
        name: "Stair",
        color: "t4",
        words: [
          { w: "Ré", t: "Era" },
          { w: "Fianaise", t: "Evidence" },
          { w: "Cartlann", t: "Archive" },
          { w: "Oidhreacht", t: "Heritage" },
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Sláinte!",
    categories: [
      {
        name: "Beannachtaí sláinte",
        color: "t1",
        words: [
          { w: "Sláinte", t: "Cheers" },
          { w: "Go maire tú", t: "May you live long" },
          { w: "Ar do shláinte", t: "To your health" },
          { w: "Beatha agus sláinte", t: "Life and health" },
        ],
      },
      {
        name: "Sa teach tábhairne",
        color: "t2",
        words: [
          { w: "Pionta", t: "Pint" },
          { w: "Gloine", t: "Glass" },
          { w: "Beoir", t: "Beer" },
          { w: "Leann úll", t: "Cider" },
        ],
      },
      {
        name: "Gan alcól",
        color: "t3",
        words: [
          { w: "Sú", t: "Juice" },
          { w: "Líomanáid", t: "Lemonade" },
          { w: "Tae luibhe", t: "Herbal tea" },
          { w: "Deoch bhog", t: "Soft drink" },
        ],
      },
      {
        name: "Sláinte choirp",
        color: "t4",
        words: [
          { w: "Croí", t: "Heart" },
          { w: "Scamhóga", t: "Lungs" },
          { w: "Fiacla", t: "Teeth" },
          { w: "Cnámha", t: "Bones" },
        ],
      },
    ],
  },
  {
    id: 14,
    title: "An Fharraige",
    categories: [
      {
        name: "Ar an uisce",
        color: "t1",
        words: [
          { w: "Bád", t: "Boat" },
          { w: "Long", t: "Ship" },
          { w: "Curach", t: "Currach" },
          { w: "Bád seoil", t: "Sailboat" },
        ],
      },
      {
        name: "Saol mara",
        color: "t2",
        words: [
          { w: "Rón", t: "Seal" },
          { w: "Deilf", t: "Dolphin" },
          { w: "Míol mór", t: "Whale" },
          { w: "Smugairle róin", t: "Jellyfish" },
        ],
      },
      {
        name: "Tírdhreach cósta",
        color: "t3",
        words: [
          { w: "Trá", t: "Beach" },
          { w: "Aill", t: "Cliff" },
          { w: "Cuan", t: "Harbour" },
          { w: "Oileán", t: "Island" },
        ],
      },
      {
        name: "An taoide",
        color: "t4",
        words: [
          { w: "Tonn", t: "Wave" },
          { w: "Taoide", t: "Tide" },
          { w: "Sruth", t: "Current" },
          { w: "Cúr", t: "Foam" },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Seachtain na Gaeilge",
    categories: [
      {
        name: "Imeachtaí",
        color: "t1",
        words: [
          { w: "Céilí", t: "Céilí" },
          { w: "Tráth na gceist", t: "Quiz" },
          { w: "Ceardlann", t: "Workshop" },
          { w: "Ceolchoirm", t: "Concert" },
        ],
      },
      {
        name: "Ag úsáid na Gaeilge",
        color: "t2",
        words: [
          { w: "Labhair", t: "Speak" },
          { w: "Éist", t: "Listen" },
          { w: "Léigh", t: "Read" },
          { w: "Scríobh", t: "Write" },
        ],
      },
      {
        name: "Pobal",
        color: "t3",
        words: [
          { w: "Gaelscoil", t: "Irish-medium school" },
          { w: "Gaeltacht", t: "Irish-speaking region" },
          { w: "Cumann", t: "Society" },
          { w: "Club comhrá", t: "Conversation club" },
        ],
      },
      {
        name: "Manaí",
        color: "t4",
        words: [
          { w: "Bain triail aisti", t: "Give it a try" },
          { w: "Is fiú í", t: "It is worth it" },
          { w: "Le chéile", t: "Together" },
          { w: "Gach lá", t: "Every day" },
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Áit Chónaithe",
    categories: [
      {
        name: "Cineálacha tí",
        color: "t1",
        words: [
          { w: "Teach", t: "House" },
          { w: "Árasán", t: "Apartment" },
          { w: "Bungaló", t: "Bungalow" },
          { w: "Teachín", t: "Cottage" },
        ],
      },
      {
        name: "Seomraí",
        color: "t2",
        words: [
          { w: "Cistin", t: "Kitchen" },
          { w: "Seomra suí", t: "Living room" },
          { w: "Seomra leapa", t: "Bedroom" },
          { w: "Seomra folctha", t: "Bathroom" },
        ],
      },
      {
        name: "Troscán",
        color: "t3",
        words: [
          { w: "Cathaoir", t: "Chair" },
          { w: "Bord", t: "Table" },
          { w: "Leaba", t: "Bed" },
          { w: "Cófra", t: "Cupboard" },
        ],
      },
      {
        name: "Timpeall an tí",
        color: "t4",
        words: [
          { w: "Gairdín", t: "Garden" },
          { w: "Doras", t: "Door" },
          { w: "Fuinneog", t: "Window" },
          { w: "Díon", t: "Roof" },
        ],
      },
    ],
  },
  {
    id: 17,
    title: "An Léann",
    categories: [
      {
        name: "Ábhair scoile",
        color: "t1",
        words: [
          { w: "Matamaitic", t: "Mathematics" },
          { w: "Stair", t: "History" },
          { w: "Tíreolaíocht", t: "Geography" },
          { w: "Eolaíocht", t: "Science" },
        ],
      },
      {
        name: "Áiseanna foghlama",
        color: "t2",
        words: [
          { w: "Leabhar", t: "Book" },
          { w: "Cóipleabhar", t: "Copybook" },
          { w: "Peann luaidhe", t: "Pencil" },
          { w: "Rialóir", t: "Ruler" },
        ],
      },
      {
        name: "Daoine sa scoil",
        color: "t3",
        words: [
          { w: "Dalta", t: "Pupil" },
          { w: "Mac léinn", t: "Student" },
          { w: "Príomhoide", t: "Principal" },
          { w: "Léachtóir", t: "Lecturer" },
        ],
      },
      {
        name: "Obair acadúil",
        color: "t4",
        words: [
          { w: "Aiste", t: "Essay" },
          { w: "Scrúdú", t: "Exam" },
          { w: "Tionscadal", t: "Project" },
          { w: "Taighde", t: "Research" },
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Gnáthchaint",
    categories: [
      {
        name: "Aontú",
        color: "t1",
        words: [
          { w: "Cinnte", t: "Certainly" },
          { w: "Sea", t: "Yes" },
          { w: "Gan dabht", t: "No doubt" },
          { w: "Ar ndóigh", t: "Of course" },
        ],
      },
      {
        name: "Easaontú",
        color: "t2",
        words: [
          { w: "Ní hea", t: "No" },
          { w: "Ní dóigh liom", t: "I do not think so" },
          { w: "Níl ar chor ar bith", t: "Not at all" },
          { w: "Nílim cinnte", t: "I am not sure" },
        ],
      },
      {
        name: "Líonadh cainte",
        color: "t3",
        words: [
          { w: "Bhuel", t: "Well" },
          { w: "Mar sin", t: "So" },
          { w: "Tá a fhios agat", t: "You know" },
          { w: "Dála an scéil", t: "By the way" },
        ],
      },
      {
        name: "Mothúcháin ghearra",
        color: "t4",
        words: [
          { w: "Áthas orm", t: "I am glad" },
          { w: "Is trua sin", t: "That is a pity" },
          { w: "Mo leithscéal", t: "Sorry" },
          { w: "Nach iontach", t: "How wonderful" },
        ],
      },
    ],
  },
  {
    id: 19,
    title: "An Chathair",
    categories: [
      {
        name: "Áiteanna cathrach",
        color: "t1",
        words: [
          { w: "Sráid", t: "Street" },
          { w: "Cearnóg", t: "Square" },
          { w: "Droichead", t: "Bridge" },
          { w: "Páirc", t: "Park" },
        ],
      },
      {
        name: "Iompar",
        color: "t2",
        words: [
          { w: "Bus", t: "Bus" },
          { w: "Traein", t: "Train" },
          { w: "Tram", t: "Tram" },
          { w: "Rothar", t: "Bicycle" },
        ],
      },
      {
        name: "Foirgnimh",
        color: "t3",
        words: [
          { w: "Leabharlann", t: "Library" },
          { w: "Amharclann", t: "Theatre" },
          { w: "Ospidéal", t: "Hospital" },
          { w: "Halla na cathrach", t: "City hall" },
        ],
      },
      {
        name: "Treoracha",
        color: "t4",
        words: [
          { w: "Ar chlé", t: "Left" },
          { w: "Ar dheis", t: "Right" },
          { w: "Díreach ar aghaidh", t: "Straight ahead" },
          { w: "Trasna", t: "Across" },
        ],
      },
    ],
  },
  {
    id: 20,
    title: "Ós Ard",
    categories: [
      {
        name: "Sa spéir",
        color: "t1",
        words: [
          { w: "Spéir", t: "Sky" },
          { w: "Réalt", t: "Star" },
          { w: "Gealach", t: "Moon" },
          { w: "Grianstad", t: "Solstice" },
        ],
      },
      {
        name: "Eitilt",
        color: "t2",
        words: [
          { w: "Eitleán", t: "Airplane" },
          { w: "Héileacaptar", t: "Helicopter" },
          { w: "Aerfort", t: "Airport" },
          { w: "Scairdeitleán", t: "Jet" },
        ],
      },
      {
        name: "Ard agus íseal",
        color: "t3",
        words: [
          { w: "Ard", t: "High" },
          { w: "Íseal", t: "Low" },
          { w: "Os cionn", t: "Above" },
          { w: "Faoi bhun", t: "Below" },
        ],
      },
      {
        name: "Radharc ón airde",
        color: "t4",
        words: [
          { w: "Sliabh", t: "Mountain" },
          { w: "Túr", t: "Tower" },
          { w: "Díon ard", t: "High roof" },
          { w: "Radharc", t: "View" },
        ],
      },
    ],
  },
  {
    id: 21,
    title: "An Margadh",
    categories: [
      {
        name: "Torthaí",
        color: "t1",
        words: [
          { w: "Úll", t: "Apple" },
          { w: "Piorra", t: "Pear" },
          { w: "Banana", t: "Banana" },
          { w: "Fíonchaora", t: "Grapes" },
        ],
      },
      {
        name: "Glasraí",
        color: "t2",
        words: [
          { w: "Cairéad", t: "Carrot" },
          { w: "Oinniún", t: "Onion" },
          { w: "Cabáiste", t: "Cabbage" },
          { w: "Piseanna", t: "Peas" },
        ],
      },
      {
        name: "Ag ceannach",
        color: "t3",
        words: [
          { w: "Praghas", t: "Price" },
          { w: "Airgead", t: "Money" },
          { w: "Mála", t: "Bag" },
          { w: "Admháil", t: "Receipt" },
        ],
      },
      {
        name: "Blas",
        color: "t4",
        words: [
          { w: "Milis", t: "Sweet" },
          { w: "Géar", t: "Sour" },
          { w: "Saillte", t: "Salty" },
          { w: "Spíosrach", t: "Spicy" },
        ],
      },
    ],
  },
  {
    id: 22,
    title: "Taisteal",
    categories: [
      {
        name: "Cáipéisí",
        color: "t1",
        words: [
          { w: "Pas", t: "Passport" },
          { w: "Ticéad eitilte", t: "Flight ticket" },
          { w: "Árachas", t: "Insurance" },
          { w: "Víosa", t: "Visa" },
        ],
      },
      {
        name: "Bagáiste",
        color: "t2",
        words: [
          { w: "Mála taistil", t: "Suitcase" },
          { w: "Mála droma", t: "Backpack" },
          { w: "Clib", t: "Tag" },
          { w: "Glas", t: "Lock" },
        ],
      },
      {
        name: "Cóiríocht",
        color: "t3",
        words: [
          { w: "Óstán", t: "Hotel" },
          { w: "Brú", t: "Hostel" },
          { w: "Lóistín", t: "Accommodation" },
          { w: "Seiceáil isteach", t: "Check-in" },
        ],
      },
      {
        name: "Ag bogadh timpeall",
        color: "t4",
        words: [
          { w: "Mapa", t: "Map" },
          { w: "Stáisiún", t: "Station" },
          { w: "Geata", t: "Gate" },
          { w: "Ceann scríbe", t: "Destination" },
        ],
      },
    ],
  },
  {
    id: 23,
    title: "Spórt",
    categories: [
      {
        name: "Liathróidí",
        color: "t1",
        words: [
          { w: "Liathróid sacair", t: "Soccer ball" },
          { w: "Liathróid rugbaí", t: "Rugby ball" },
          { w: "Sliotar", t: "Sliotar" },
          { w: "Liathróid leadóige", t: "Tennis ball" },
        ],
      },
      {
        name: "Áiteanna imeartha",
        color: "t2",
        words: [
          { w: "Páirc imeartha", t: "Playing field" },
          { w: "Cúirt", t: "Court" },
          { w: "Linn snámha", t: "Swimming pool" },
          { w: "Rian", t: "Track" },
        ],
      },
      {
        name: "Gníomhaíochtaí",
        color: "t3",
        words: [
          { w: "Rith", t: "Run" },
          { w: "Snámh", t: "Swim" },
          { w: "Léim", t: "Jump" },
          { w: "Caitheamh", t: "Throw" },
        ],
      },
      {
        name: "Torthaí cluiche",
        color: "t4",
        words: [
          { w: "Bua", t: "Win" },
          { w: "Cailliúint", t: "Loss" },
          { w: "Comhscór", t: "Draw" },
          { w: "Craobh", t: "Championship" },
        ],
      },
    ],
  },
  {
    id: 24,
    title: "An Nollaig",
    categories: [
      {
        name: "Maisiúcháin Nollag",
        color: "t1",
        words: [
          { w: "Crann Nollag", t: "Christmas tree" },
          { w: "Soilse", t: "Lights" },
          { w: "Fleasc", t: "Wreath" },
          { w: "Réaltóg", t: "Star" },
        ],
      },
      {
        name: "Bia Nollag",
        color: "t2",
        words: [
          { w: "Turcaí", t: "Turkey" },
          { w: "Liamhás", t: "Ham" },
          { w: "Maróg Nollag", t: "Christmas pudding" },
          { w: "Pióg mhionra", t: "Mince pie" },
        ],
      },
      {
        name: "Bronntanais",
        color: "t3",
        words: [
          { w: "Bronntanas", t: "Gift" },
          { w: "Páipéar beartáin", t: "Wrapping paper" },
          { w: "Ribín", t: "Ribbon" },
          { w: "Cárta", t: "Card" },
        ],
      },
      {
        name: "Frásaí séasúir",
        color: "t4",
        words: [
          { w: "Nollaig shona", t: "Happy Christmas" },
          { w: "Athbhliain faoi mhaise", t: "Happy New Year" },
          { w: "Síocháin", t: "Peace" },
          { w: "Áthas", t: "Joy" },
        ],
      },
    ],
  },
  {
    id: 25,
    title: "An tEarrach",
    categories: [
      {
        name: "Comharthaí earraigh",
        color: "t1",
        words: [
          { w: "Bláth", t: "Flower" },
          { w: "Bachlóg", t: "Bud" },
          { w: "Uan", t: "Lamb" },
          { w: "Nead", t: "Nest" },
        ],
      },
      {
        name: "Sa ghairdín",
        color: "t2",
        words: [
          { w: "Síol", t: "Seed" },
          { w: "Ithir", t: "Soil" },
          { w: "Lus", t: "Plant" },
          { w: "Crannóg", t: "Sapling" },
        ],
      },
      {
        name: "Aimsir éadrom",
        color: "t3",
        words: [
          { w: "Bog", t: "Mild" },
          { w: "Úr", t: "Fresh" },
          { w: "Fliuch", t: "Wet" },
          { w: "Grianmhar", t: "Sunny" },
        ],
      },
      {
        name: "Féilte earraigh",
        color: "t4",
        words: [
          { w: "Imbolc", t: "Imbolc" },
          { w: "Lá Fhéile Bríde", t: "Saint Brigid's Day" },
          { w: "Cáisc", t: "Easter" },
          { w: "Bealtaine", t: "May Day" },
        ],
      },
    ],
  },
];
 
// ── Helpers ────────────────────────────────────────────────────
 
export const LAUNCH_DATE = new Date(2026, 4, 9);

function getCalendarDayNumber(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}
 
export function getTodaysPuzzle() {
  const today = new Date();
  const dayOffset = Math.max(
    0,
    Math.floor(
      (getCalendarDayNumber(today) - getCalendarDayNumber(LAUNCH_DATE)) /
        86_400_000
    )
  );
  return allPuzzles[dayOffset % allPuzzles.length];
}
 
export function getPuzzleById(id) {
  return allPuzzles.find((p) => p.id === id) ?? allPuzzles[0];
}
 
// Legacy export — keeps existing game components working without changes
// Maps our structure to the shape the base repo expects:
//   { startingGroups: [{ title, color, members }] }
export function toGameFormat(puzzle) {
  return {
    startingGroups: puzzle.categories.map((cat) => ({
      title: cat.name,
      color: cat.color,
      members: cat.words.map((w) => w.w),
      // non-standard extra fields Ceangal components will use:
      _ceangalColor: cat.color,
      _translations: Object.fromEntries(cat.words.map((w) => [w.w, w.t])),
    })),
  };
}

const difficultyMap = { t1: 1, t2: 2, t3: 3, t4: 4 };

export const CONNECTION_GAMES = allPuzzles.map((puzzle) =>
  puzzle.categories.map((cat) => ({
    category: cat.name,
    words: cat.words.map((word) => word.w),
    difficulty: difficultyMap[cat.color],
    _translations: Object.fromEntries(
      cat.words.map((word) => [word.w, word.t])
    ),
    translations: Object.fromEntries(cat.words.map((word) => [word.w, word.t])),
  }))
);
