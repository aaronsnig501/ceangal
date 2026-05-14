/**
 * Ceangal — puzzle data
 *
 * Structure:
 *   export const allPuzzles = [{ id, title, categories }]
 *   categories: [{ name, color: 't1'|'t2'|'t3'|'t4', words: [{ w, t, a? }] }]
 *     w = Irish word/phrase
 *     t = English translation (shown only when GA→EN toggle is on)
 *     a = optional pronunciation audio file path for this word
 *
 * getTodaysPuzzle() returns the puzzle for today based on launch date offset.
 * getPuzzleById(id) returns a specific puzzle by id.
 */
 
export const allPuzzles = [
  {
    id: 1,
    title: "Sa Ċaife",
    categories: [
      {
        name: "Deoċanna",
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
          { w: "Le do ṫoil", t: "Please" },
          { w: "Go raiḃ maiṫ agat", t: "Thank you" },
          { w: "An féidir liom?", t: "May I?" },
          { w: "An bille", t: "The bill" },
        ],
      },
      {
        name: "Roġanna cupáin",
        color: "t4",
        words: [
          { w: "Anseo", t: "To stay in" },
          { w: "Le taḃairt leat", t: "To take away" },
          { w: "Cupán mór", t: "Large cup" },
          { w: "Bainne coirce", t: "Oat milk" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Beannaċtaí",
    categories: [
      {
        name: "Beannaċtaí bunúsaċa",
        color: "t1",
        words: [
          { w: "Dia duit", t: "Hello" },
          { w: "Dia is Muire duit", t: "Hello in reply" },
          { w: "Haiġ", t: "Hi" },
          { w: "Fáilte", t: "Welcome" },
        ],
      },
      {
        name: "Fiafraí de ḋuine",
        color: "t2",
        words: [
          { w: "Conas atá tú?", t: "How are you?" },
          { w: "Cén ċaoi a ḃfuil tú?", t: "How are you?" },
          { w: "Cad é mar atá tú?", t: "How are you?" },
          { w: "An ḃfuil tú go maiṫ?", t: "Are you well?" },
        ],
      },
      {
        name: "Freagraí dearfaċa",
        color: "t3",
        words: [
          { w: "Tá mé go maiṫ", t: "I am well" },
          { w: "Ar ḟeaḃas", t: "Excellent" },
          { w: "Go breá", t: "Fine" },
          { w: "Ní dona", t: "Not bad" },
        ],
      },
      {
        name: "Slán a ḟágáil",
        color: "t4",
        words: [
          { w: "Slán", t: "Goodbye" },
          { w: "Slán go fóill", t: "Goodbye for now" },
          { w: "Feicfiḋ mé ṫú", t: "I will see you" },
          { w: "Oíċe ṁaiṫ", t: "Good night" },
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
          { w: "Peil Ġaelaċ", t: "Gaelic football" },
          { w: "Iománaíoċt", t: "Hurling" },
          { w: "Camógaíoċt", t: "Camogie" },
          { w: "Liaṫróid láiṁe", t: "Handball" },
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
          { w: "Páirc an Ċrócaiġ", t: "Croke Park" },
          { w: "Staidiam", t: "Stadium" },
          { w: "Seomra feistis", t: "Dressing room" },
          { w: "Taoḃlíne", t: "Sideline" },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Oíċe Ṡaṁna",
    categories: [
      {
        name: "Rudaí scanrúla",
        color: "t1",
        words: [
          { w: "Taiḃse", t: "Ghost" },
          { w: "Cailleaċ", t: "Witch" },
          { w: "Cnáṁarlaċ", t: "Skeleton" },
          { w: "Arraċt", t: "Monster" },
        ],
      },
      {
        name: "Maisiúċáin",
        color: "t2",
        words: [
          { w: "Puimcín", t: "Pumpkin" },
          { w: "Coinneal", t: "Candle" },
          { w: "Masc", t: "Mask" },
          { w: "Culaiṫ", t: "Costume" },
        ],
      },
      {
        name: "Gníoṁarṫa na hoíċe",
        color: "t3",
        words: [
          { w: "Ag cnagaḋ", t: "Knocking" },
          { w: "Ag scanrú", t: "Scaring" },
          { w: "Ag ceilt", t: "Hiding" },
          { w: "Ag gléasaḋ suas", t: "Dressing up" },
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
    title: "Logainmneaċa Laiġean",
    categories: [
      {
        name: "Contaeṫa Laiġean",
        color: "t1",
        words: [
          { w: "Baile Áṫa Cliaṫ", t: "Dublin" },
          { w: "Cill Dara", t: "Kildare" },
          { w: "Cill Ṁantáin", t: "Wicklow" },
          { w: "An Ṁí", t: "Meath" },
        ],
      },
      {
        name: "Bailte móra",
        color: "t2",
        words: [
          { w: "Droiċead Áṫa", t: "Drogheda" },
          { w: "Port Laoise", t: "Portlaoise" },
          { w: "Inis Córṫaiḋ", t: "Enniscorthy" },
          { w: "Ceaṫarlaċ", t: "Carlow" },
        ],
      },
      {
        name: "Áiteanna cois farraige",
        color: "t3",
        words: [
          { w: "Bré", t: "Bray" },
          { w: "Dún Laoġaire", t: "Dún Laoghaire" },
          { w: "An Ros Láir", t: "Rosslare" },
          { w: "Inḃear Mór", t: "Arklow" },
        ],
      },
      {
        name: "Logainmneaċa le Cill",
        color: "t4",
        words: [
          { w: "Cill Ċainniġ", t: "Kilkenny" },
          { w: "Cill Ṁór", t: "Kilmore" },
          { w: "Cill Ḃeagáin", t: "Kilbeggan" },
          { w: "Cill Ċoca", t: "Kilcock" },
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
          { w: "Stoḃaċ", t: "Stew" },
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
        name: "Sa ḃricfeasta",
        color: "t3",
        words: [
          { w: "Uḃ", t: "Egg" },
          { w: "Ispíní", t: "Sausages" },
          { w: "Bagún", t: "Bacon" },
          { w: "Pónairí", t: "Beans" },
        ],
      },
      {
        name: "Coṁáḃair",
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
        name: "Báisteaċ ⁊ scamall",
        color: "t1",
        words: [
          { w: "Báisteaċ", t: "Rain" },
          { w: "Ceoḃrán", t: "Drizzle" },
          { w: "Scamall", t: "Cloud" },
          { w: "Ciṫ", t: "Shower" },
        ],
      },
      {
        name: "Fuar",
        color: "t2",
        words: [
          { w: "Sneaċta", t: "Snow" },
          { w: "Sioc", t: "Frost" },
          { w: "Oiġear", t: "Ice" },
          { w: "Fuaċt", t: "Cold" },
        ],
      },
      {
        name: "Te ⁊ geal",
        color: "t3",
        words: [
          { w: "Grian", t: "Sun" },
          { w: "Teas", t: "Heat" },
          { w: "Spéir ġlan", t: "Clear sky" },
          { w: "Boġa báistí", t: "Rainbow" },
        ],
      },
      {
        name: "Gaoṫ",
        color: "t4",
        words: [
          { w: "Gaoṫ", t: "Wind" },
          { w: "Stoirm", t: "Storm" },
          { w: "Séideán", t: "Gust" },
          { w: "Gála", t: "Gale" },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "An Teaġlaċ",
    categories: [
      {
        name: "Tuismiṫeoirí ⁊ páistí",
        color: "t1",
        words: [
          { w: "Máṫair", t: "Mother" },
          { w: "Aṫair", t: "Father" },
          { w: "Iníon", t: "Daughter" },
          { w: "Mac", t: "Son" },
        ],
      },
      {
        name: "Siblíní",
        color: "t2",
        words: [
          { w: "Deirfiúr", t: "Sister" },
          { w: "Dearṫáir", t: "Brother" },
          { w: "Leaṫḋeirfiúr", t: "Half-sister" },
          { w: "Leaṫḋearṫáir", t: "Half-brother" },
        ],
      },
      {
        name: "Seantuismiṫeoirí",
        color: "t3",
        words: [
          { w: "Seanṁáṫair", t: "Grandmother" },
          { w: "Seanaṫair", t: "Grandfather" },
          { w: "Garṁac", t: "Grandson" },
          { w: "Gariníon", t: "Granddaughter" },
        ],
      },
      {
        name: "Gaolta eile",
        color: "t4",
        words: [
          { w: "Aintín", t: "Aunt" },
          { w: "Uncail", t: "Uncle" },
          { w: "Col ceaṫrar", t: "Cousin" },
          { w: "Neaċt", t: "Niece" },
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
          { w: "Boḋrán", t: "Bodhrán" },
          { w: "Píobaí uilleann", t: "Uilleann pipes" },
        ],
      },
      {
        name: "Cineálaċa ceoil",
        color: "t2",
        words: [
          { w: "Port", t: "Jig" },
          { w: "Ríl", t: "Reel" },
          { w: "Aṁrán", t: "Song" },
          { w: "Caoineaḋ", t: "Lament" },
        ],
      },
      {
        name: "Daoine sa seisiún",
        color: "t3",
        words: [
          { w: "Ceoltóir", t: "Musician" },
          { w: "Aṁránaí", t: "Singer" },
          { w: "Rinceoir", t: "Dancer" },
          { w: "Éisteoir", t: "Listener" },
        ],
      },
      {
        name: "Sa ċeoláras",
        color: "t4",
        words: [
          { w: "Ardán", t: "Stage" },
          { w: "Micreafón", t: "Microphone" },
          { w: "Ticéad", t: "Ticket" },
          { w: "Bualaḋ bos", t: "Applause" },
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
          { w: "Monarċa", t: "Factory" },
          { w: "Feirm", t: "Farm" },
        ],
      },
      {
        name: "Gairmeaċa",
        color: "t2",
        words: [
          { w: "Múinteoir", t: "Teacher" },
          { w: "Doċtúir", t: "Doctor" },
          { w: "Innealtóir", t: "Engineer" },
          { w: "Cócaire", t: "Cook" },
        ],
      },
      {
        name: "Sa ríoṁaire",
        color: "t3",
        words: [
          { w: "Ríoṁṗost", t: "Email" },
          { w: "Cruinniú", t: "Meeting" },
          { w: "Scarḃileog", t: "Spreadsheet" },
          { w: "Pasḟocal", t: "Password" },
        ],
      },
      {
        name: "Am oibre",
        color: "t4",
        words: [
          { w: "Tús", t: "Start" },
          { w: "Sos", t: "Break" },
          { w: "Spriocḋáta", t: "Deadline" },
          { w: "Tuarastal", t: "Salary" },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Na Daṫanna",
    categories: [
      {
        name: "Daṫanna coitianta",
        color: "t1",
        words: [
          { w: "Dearg", t: "Red" },
          { w: "Gorm", t: "Blue" },
          { w: "Glas", t: "Green" },
          { w: "Buí", t: "Yellow" },
        ],
      },
      {
        name: "Daṫanna eile",
        color: "t2",
        words: [
          { w: "Corcra", t: "Purple" },
          { w: "Oráiste", t: "Orange" },
          { w: "Bándearg", t: "Pink" },
          { w: "Donn", t: "Brown" },
        ],
      },
      {
        name: "Solas ⁊ dorċadas",
        color: "t3",
        words: [
          { w: "Bán", t: "White" },
          { w: "Duḃ", t: "Black" },
          { w: "Liaṫ", t: "Grey" },
          { w: "Geal", t: "Bright" },
        ],
      },
      {
        name: "Cur síos ar ḋaṫ",
        color: "t4",
        words: [
          { w: "Éadrom", t: "Light" },
          { w: "Dorċa", t: "Dark" },
          { w: "Lonraċ", t: "Shiny" },
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
          { w: "Dealḃ", t: "Sculpture" },
          { w: "Léarscáil", t: "Map" },
          { w: "Déantán", t: "Artefact" },
        ],
      },
      {
        name: "Daoine sa ṁúsaem",
        color: "t2",
        words: [
          { w: "Cuairteoir", t: "Visitor" },
          { w: "Treoraí", t: "Guide" },
          { w: "Coimeádaí", t: "Curator" },
          { w: "Ealaíontóir", t: "Artist" },
        ],
      },
      {
        name: "Áiteanna istiġ",
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
          { w: "Oiḋreaċt", t: "Heritage" },
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Sláinte!",
    categories: [
      {
        name: "Beannaċtaí sláinte",
        color: "t1",
        words: [
          { w: "Sláinte", t: "Cheers" },
          { w: "Go maire tú", t: "May you live long" },
          { w: "Ar do ṡláinte", t: "To your health" },
          { w: "Beaṫa ⁊ sláinte", t: "Life and health" },
        ],
      },
      {
        name: "Sa teaċ táḃairne",
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
          { w: "Tae luiḃe", t: "Herbal tea" },
          { w: "Deoċ ḃog", t: "Soft drink" },
        ],
      },
      {
        name: "Sláinte ċoirp",
        color: "t4",
        words: [
          { w: "Croí", t: "Heart" },
          { w: "Scaṁóga", t: "Lungs" },
          { w: "Fiacla", t: "Teeth" },
          { w: "Cnáṁa", t: "Bones" },
        ],
      },
    ],
  },
  {
    id: 14,
    title: "An Ḟarraige",
    categories: [
      {
        name: "Ar an uisce",
        color: "t1",
        words: [
          { w: "Bád", t: "Boat" },
          { w: "Long", t: "Ship" },
          { w: "Curaċ", t: "Currach" },
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
        name: "Tírḋreaċ cósta",
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
          { w: "Sruṫ", t: "Current" },
          { w: "Cúr", t: "Foam" },
        ],
      },
    ],
  },
  {
    id: 15,
    title: "Seaċtain na Gaeilge",
    categories: [
      {
        name: "Imeaċtaí",
        color: "t1",
        words: [
          { w: "Céilí", t: "Céilí" },
          { w: "Tráṫ na gceist", t: "Quiz" },
          { w: "Ceardlann", t: "Workshop" },
          { w: "Ceolċoirm", t: "Concert" },
        ],
      },
      {
        name: "Ag úsáid na Gaeilge",
        color: "t2",
        words: [
          { w: "Laḃair", t: "Speak" },
          { w: "Éist", t: "Listen" },
          { w: "Léiġ", t: "Read" },
          { w: "Scríoḃ", t: "Write" },
        ],
      },
      {
        name: "Pobal",
        color: "t3",
        words: [
          { w: "Gaelscoil", t: "Irish-medium school" },
          { w: "Gaeltaċt", t: "Irish-speaking region" },
          { w: "Cumann", t: "Society" },
          { w: "Club coṁrá", t: "Conversation club" },
        ],
      },
      {
        name: "Manaí",
        color: "t4",
        words: [
          { w: "Bain triail aisti", t: "Give it a try" },
          { w: "Is fiú í", t: "It is worth it" },
          { w: "Le ċéile", t: "Together" },
          { w: "Gaċ lá", t: "Every day" },
        ],
      },
    ],
  },
  {
    id: 16,
    title: "Áit Ċónaiṫe",
    categories: [
      {
        name: "Cineálaċa tí",
        color: "t1",
        words: [
          { w: "Teaċ", t: "House" },
          { w: "Árasán", t: "Apartment" },
          { w: "Bungaló", t: "Bungalow" },
          { w: "Teaċín", t: "Cottage" },
        ],
      },
      {
        name: "Seomraí",
        color: "t2",
        words: [
          { w: "Cistin", t: "Kitchen" },
          { w: "Seomra suí", t: "Living room" },
          { w: "Seomra leapa", t: "Bedroom" },
          { w: "Seomra folcṫa", t: "Bathroom" },
        ],
      },
      {
        name: "Troscán",
        color: "t3",
        words: [
          { w: "Caṫaoir", t: "Chair" },
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
        name: "Áḃair scoile",
        color: "t1",
        words: [
          { w: "Matamaitic", t: "Mathematics" },
          { w: "Stair", t: "History" },
          { w: "Tíreolaíoċt", t: "Geography" },
          { w: "Eolaíoċt", t: "Science" },
        ],
      },
      {
        name: "Áiseanna foġlama",
        color: "t2",
        words: [
          { w: "Leaḃar", t: "Book" },
          { w: "Cóipleaḃar", t: "Copybook" },
          { w: "Peann luaiḋe", t: "Pencil" },
          { w: "Rialóir", t: "Ruler" },
        ],
      },
      {
        name: "Daoine sa scoil",
        color: "t3",
        words: [
          { w: "Dalta", t: "Pupil" },
          { w: "Mac léinn", t: "Student" },
          { w: "Príoṁoide", t: "Principal" },
          { w: "Léaċtóir", t: "Lecturer" },
        ],
      },
      {
        name: "Obair acadúil",
        color: "t4",
        words: [
          { w: "Aiste", t: "Essay" },
          { w: "Scrúdú", t: "Exam" },
          { w: "Tionscadal", t: "Project" },
          { w: "Taiġde", t: "Research" },
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Gnáṫċaint",
    categories: [
      {
        name: "Aontú",
        color: "t1",
        words: [
          { w: "Cinnte", t: "Certainly" },
          { w: "Sea", t: "Yes" },
          { w: "Gan daḃt", t: "No doubt" },
          { w: "Ar ndóiġ", t: "Of course" },
        ],
      },
      {
        name: "Easaontú",
        color: "t2",
        words: [
          { w: "Ní hea", t: "No" },
          { w: "Ní dóiġ liom", t: "I do not think so" },
          { w: "Níl ar ċor ar biṫ", t: "Not at all" },
          { w: "Nílim cinnte", t: "I am not sure" },
        ],
      },
      {
        name: "Líonaḋ cainte",
        color: "t3",
        words: [
          { w: "Ḃuel", t: "Well" },
          { w: "Mar sin", t: "So" },
          { w: "Tá a ḟios agat", t: "You know" },
          { w: "Dála an scéil", t: "By the way" },
        ],
      },
      {
        name: "Moṫúċáin ġearra",
        color: "t4",
        words: [
          { w: "Áṫas orm", t: "I am glad" },
          { w: "Is trua sin", t: "That is a pity" },
          { w: "Mo leiṫscéal", t: "Sorry" },
          { w: "Naċ iontaċ", t: "How wonderful" },
        ],
      },
    ],
  },
  {
    id: 19,
    title: "An Ċaṫair",
    categories: [
      {
        name: "Áiteanna caṫraċ",
        color: "t1",
        words: [
          { w: "Sráid", t: "Street" },
          { w: "Cearnóg", t: "Square" },
          { w: "Droiċead", t: "Bridge" },
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
          { w: "Roṫar", t: "Bicycle" },
        ],
      },
      {
        name: "Foirgniṁ",
        color: "t3",
        words: [
          { w: "Leaḃarlann", t: "Library" },
          { w: "Aṁarclann", t: "Theatre" },
          { w: "Ospidéal", t: "Hospital" },
          { w: "Halla na caṫraċ", t: "City hall" },
        ],
      },
      {
        name: "Treoraċa",
        color: "t4",
        words: [
          { w: "Ar ċlé", t: "Left" },
          { w: "Ar ḋeis", t: "Right" },
          { w: "Díreaċ ar aġaiḋ", t: "Straight ahead" },
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
          { w: "Gealaċ", t: "Moon" },
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
        name: "Ard ⁊ íseal",
        color: "t3",
        words: [
          { w: "Ard", t: "High" },
          { w: "Íseal", t: "Low" },
          { w: "Os cionn", t: "Above" },
          { w: "Faoi ḃun", t: "Below" },
        ],
      },
      {
        name: "Raḋarc ón airde",
        color: "t4",
        words: [
          { w: "Sliaḃ", t: "Mountain" },
          { w: "Túr", t: "Tower" },
          { w: "Díon ard", t: "High roof" },
          { w: "Raḋarc", t: "View" },
        ],
      },
    ],
  },
  {
    id: 21,
    title: "An Margaḋ",
    categories: [
      {
        name: "Torṫaí",
        color: "t1",
        words: [
          { w: "Úll", t: "Apple" },
          { w: "Piorra", t: "Pear" },
          { w: "Banana", t: "Banana" },
          { w: "Fíonċaora", t: "Grapes" },
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
        name: "Ag ceannaċ",
        color: "t3",
        words: [
          { w: "Praġas", t: "Price" },
          { w: "Airgead", t: "Money" },
          { w: "Mála", t: "Bag" },
          { w: "Adṁáil", t: "Receipt" },
        ],
      },
      {
        name: "Blas",
        color: "t4",
        words: [
          { w: "Milis", t: "Sweet" },
          { w: "Géar", t: "Sour" },
          { w: "Saillte", t: "Salty" },
          { w: "Spíosraċ", t: "Spicy" },
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
          { w: "Áraċas", t: "Insurance" },
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
        name: "Cóiríoċt",
        color: "t3",
        words: [
          { w: "Óstán", t: "Hotel" },
          { w: "Brú", t: "Hostel" },
          { w: "Lóistín", t: "Accommodation" },
          { w: "Seiceáil isteaċ", t: "Check-in" },
        ],
      },
      {
        name: "Ag bogaḋ timpeall",
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
        name: "Liaṫróidí",
        color: "t1",
        words: [
          { w: "Liaṫróid sacair", t: "Soccer ball" },
          { w: "Liaṫróid rugbaí", t: "Rugby ball" },
          { w: "Sliotar", t: "Sliotar" },
          { w: "Liaṫróid leadóige", t: "Tennis ball" },
        ],
      },
      {
        name: "Áiteanna imearṫa",
        color: "t2",
        words: [
          { w: "Páirc imearṫa", t: "Playing field" },
          { w: "Cúirt", t: "Court" },
          { w: "Linn snáṁa", t: "Swimming pool" },
          { w: "Rian", t: "Track" },
        ],
      },
      {
        name: "Gníoṁaíoċtaí",
        color: "t3",
        words: [
          { w: "Riṫ", t: "Run" },
          { w: "Snáṁ", t: "Swim" },
          { w: "Léim", t: "Jump" },
          { w: "Caiṫeaṁ", t: "Throw" },
        ],
      },
      {
        name: "Torṫaí cluiċe",
        color: "t4",
        words: [
          { w: "Bua", t: "Win" },
          { w: "Cailliúint", t: "Loss" },
          { w: "Coṁscór", t: "Draw" },
          { w: "Craoḃ", t: "Championship" },
        ],
      },
    ],
  },
  {
    id: 24,
    title: "An Nollaig",
    categories: [
      {
        name: "Maisiúċáin Nollag",
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
          { w: "Liaṁás", t: "Ham" },
          { w: "Maróg Nollag", t: "Christmas pudding" },
          { w: "Pióg ṁionra", t: "Mince pie" },
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
          { w: "Nollaig ṡona", t: "Happy Christmas" },
          { w: "Aṫḃliain faoi ṁaise", t: "Happy New Year" },
          { w: "Síoċáin", t: "Peace" },
          { w: "Áṫas", t: "Joy" },
        ],
      },
    ],
  },
  {
    id: 25,
    title: "An tEarraċ",
    categories: [
      {
        name: "Coṁarṫaí earraiġ",
        color: "t1",
        words: [
          { w: "Bláṫ", t: "Flower" },
          { w: "Baċlóg", t: "Bud" },
          { w: "Uan", t: "Lamb" },
          { w: "Nead", t: "Nest" },
        ],
      },
      {
        name: "Sa ġairdín",
        color: "t2",
        words: [
          { w: "Síol", t: "Seed" },
          { w: "Iṫir", t: "Soil" },
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
          { w: "Fliuċ", t: "Wet" },
          { w: "Grianṁar", t: "Sunny" },
        ],
      },
      {
        name: "Féilte earraiġ",
        color: "t4",
        words: [
          { w: "Imbolc", t: "Imbolc" },
          { w: "Lá Ḟéile Bríde", t: "Saint Brigid's Day" },
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
      _pronunciations: Object.fromEntries(
        cat.words
          .filter((w) => typeof w.a === "string" && w.a.length > 0)
          .map((w) => [w.w, w.a])
      ),
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
    _pronunciations: Object.fromEntries(
      cat.words
        .filter((word) => typeof word.a === "string" && word.a.length > 0)
        .map((word) => [word.w, word.a])
    ),
  }))
);
