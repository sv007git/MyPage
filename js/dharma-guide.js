/**
 * Daily Hindu Panchang-Based Worship Guide (Dharma Darshanam)
 * Inspired by Devi Shree Guruji's "Omkaram" format on Zee Telugu.
 * 
 * Systematically identifies:
 *  1. Day's spiritual significance (Festivals, Vratas, Tithis, Nakshatras, Weekday)
 *  2. Presiding deity of the day with scriptural reasons
 *  3. Primary Vedic/Puranic sacred mantra with meaning, count (11/108), and pronunciation
 *  4. Secondary planetary / weekday deity mantra
 *  5. Simple 5-step home puja routine, customized naivedyam, and flower offerings
 *  6. Recommended acts of charity (Dana/Dharma/Go Seva)
 *  7. Puranic story & spiritual significance (Guruji Ashirvachanam)
 *  8. Fasting & health-aware observance guidelines
 * 
 * Strictly bilingual:
 *  - English mode: 100% pure English with Devanagari & transliteration (ZERO Telugu script)
 *  - Telugu mode: 100% authentic, graceful Telugu script
 */

const DharmaGuide = (() => {

  // Universal Weekday Mantras & Planetary Deities
  const WEEKDAY_DEITIES = {
    0: { // Sunday / Ravivara
      deity_en: 'Lord Surya Bhagavan (The Sun God) & Gayatri Devi',
      deity_te: 'శ్రీ సూర్య భగవానుడు & గాయత్రీ దేవి',
      title_en: 'Ravivara Surya Upasana',
      title_te: 'ఆదివార సూర్య నమస్కార & ఆరోగ్య ప్రార్థన',
      reason_en: 'Sunday is ruled by the Sun (Surya), the soul of the cosmos (Atmakaraka) and giver of vitality, health, and vision. Chanting Surya mantras on Sunday dispels gloom, improves eyesight, and enhances leadership.',
      reason_te: 'ఆదివారం సూర్య భగవానునికి ప్రీతిపాత్రమైన దినం. సూర్యుడు ప్రత్యక్ష దైవం, ఆరోగ్య ప్రదాత. ఈ రోజు సూర్య నమస్కారాలు చేయడం, గాయత్రీ మంత్రం జపించడం వల్ల ఆయురారోగ్యాలు, తేజస్సు, మనోబలం చేకూరుతాయి.',
      mantra: {
        sanskrit: 'ॐ ह्रीं सूर्याय नमः॥\nॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
        telugu: 'ఓం హ్రీం సూర్యాయ నమః॥\nఓం భూర్భువః స్వః తత్సవితుర్వరేణ్యం భర్గో దేవస్య ధీమహి ధియో యో నః ప్రచోదయాత్॥',
        translit: 'Om Hreem Sooryaya Namah ||\nOm Bhoor-Bhuvaḥ Svaḥ Tat-Savitur-Vareṇyam Bhargo Devasya Dheemahi Dhiyo Yo Naḥ Prachodayaat ||',
        meaning_en: 'Salutations to the divine Sun, the illuminator of the universe. We meditate upon the supreme effulgence of Savitur, may that divine light illuminate our intellect.',
        meaning_te: 'సమస్త లోకాలకు వెలుగునిచ్చే సూర్య భగవానునికి నమస్కారాలు. ఆ సవితృ దేవుని దివ్య తేజస్సును మేము ధ్యానిస్తున్నాము; ఆ పరమాత్మ మా బుద్ధిని సన్మార్గంలో నడిపించుగాక.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      weekday_mantra: {
        name_en: 'Surya Bija Mantra',
        name_te: 'సూర్య బీజ మంత్రం',
        text_en: 'Om Hram Hreem Hroum Sah Suryaya Namah ||',
        text_te: 'ఓం హ్రాం హ్రీం హ్రౌం సః సూర్యాయ నమః॥',
        meaning_en: 'Salutations to Surya, the dispeller of darkness and source of health.'
      },
      puja: {
        flowers_en: 'Red flowers (Hibiscus / Sembaruthi / Red Lotus)',
        flowers_te: 'ఎర్రటి పువ్వులు (మందార, ఎరుపు గులాబీలు)',
        naivedyam_en: 'Wheat-based sweet, Jaggery (Gud), or Sweet Pongal / Fruits',
        naivedyam_te: 'గోధుమ రవ్వ ప్రసాదం, బెల్లం, పొంగలి లేదా పండ్లు',
        charity_en: 'Offer water (Arghya) to the rising sun; donate wheat or jaggery to the needy.',
        charity_te: 'సూర్యోదయ వేళ రాగి పాత్రతో సూర్యునికి అర్ఘ్యం ఇవ్వండి; పేదలకు గోధుమలు లేదా బెల్లం దానం చేయండి.'
      },
      story_en: 'According to the Bhavishya Purana, Lord Krishna instructed his son Samba to worship the Sun to overcome illness. Lord Rama also received the Aditya Hridaya Stotram from sage Agastya before his victory. Sunday devotion cultivates unshakeable confidence and physical vigor.',
      story_te: 'భవిష్య పురాణం ప్రకారం శ్రీకృష్ణుని కుమారుడైన సాంబుడు సూర్యారాధనతో సంపూర్ణ ఆరోగ్యం పొందాడు. అగస్త్య మహర్షి శ్రీరామునికి ఆదిత్య హృదయ స్తోత్రాన్ని ఉపదేశించి విజయ మార్గాన్ని చూపారు. నిత్య సూర్యారాధన సకల దోషాలను హరిస్తుంది.'
    },
    1: { // Monday / Somavara
      deity_en: 'Lord Shiva (Someshwara) & Chandra Bhagavan',
      deity_te: 'పరమశివుడు (సోమేశ్వరుడు) & చంద్ర భగవానుడు',
      title_en: 'Somavara Shiva Aradhana',
      title_te: 'సోమవార శివారాధన & మనశ్శాంతి ప్రార్థన',
      reason_en: 'Monday belongs to Lord Shiva, who wears the crescent Moon (Soma) upon his crest. Worshipping Shiva on Monday pacifies mental anxiety, balances emotions, and grants inner peace.',
      reason_te: 'సోమవారం చంద్రశేఖరుడైన మహాశివునికి అత్యంత ప్రీతిపాత్రమైన దినం. చంద్రునికి అధిపతి అయిన శివుని పూజించడం వల్ల మానసిక ఆందోళనలు తొలగి, మనశ్శాంతి, కుటుంబ సౌభాగ్యం లభిస్తాయి.',
      mantra: {
        sanskrit: 'ॐ नमः शिवाय॥\nॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्य pushyāt मामृतात्॥',
        telugu: 'ఓం నమః శివాయ॥\nఓం త్ర్యంబకం యజామహే సుగంధిం పుష్టివర్ధనమ్। ఉర్వారుకమివ బంధనాన్మృత్యోర్ముక్షీయ మామృతాత్॥',
        translit: 'Om Namah Shivaaya ||\nOm Tryambakam Yajaamahe Sugandhim Pushti-Vardhanam | Urvaarukam-Iva Bandhanaan Mrityor-Muksheeya Maamritaat ||',
        meaning_en: 'We worship the three-eyed Lord Shiva, who is fragrant and nourishes all beings. May he liberate us from mortality, just as a ripe cucumber effortlessly separates from its vine.',
        meaning_te: 'సకల ప్రాణులను పోషించే ముక్కంటి పరమేశ్వరునికి నమస్కారాలు. పండిన దోసపండు తొడిమ నుండి విడివడినట్లు, మాకు సంసార బంధాల నుండి ముక్తిని, అమృతత్వాన్ని ప్రసాదించుము.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      weekday_mantra: {
        name_en: 'Chandra Bija Mantra',
        name_te: 'చంద్ర బీజ మంత్రం',
        text_en: 'Om Shram Shreem Shroum Sah Chandraya Namah ||',
        text_te: 'ఓం శ్రాం శ్రీం శ్రౌం సః చంద్రాయ నమః॥',
        meaning_en: 'Salutations to Chandra, ruler of mind and coolness.'
      },
      puja: {
        flowers_en: 'White flowers (Jasmine, Mogra, White Hibiscus), Bilva leaves',
        flowers_te: 'తెల్లటి పువ్వులు (మల్లెలు, సంపెంగ), మారేడు దళాలు (బిల్వ పత్రాలు)',
        naivedyam_en: 'Raw milk, Curd rice, Kheer / Payasam, or Panchamritam',
        naivedyam_te: 'పచ్చి పాలు, పరమాన్నం, పెరుగన్నం లేదా పండ్లు',
        charity_en: 'Offer milk or white rice to the needy; provide cool water to thirsty travelers.',
        charity_te: 'పేదలకు లేదా దేవాలయంలో బియ్యం, పాలు లేదా పెరుగు దానం చేయండి.'
      },
      story_en: 'The Shiva Purana narrates that when Chandra (the Moon) was cursed with illness, he performed rigorous tapasya to Lord Shiva. Shiva cured him and adorned the crescent Moon upon his hair, naming him Someshwara. Monday Shiva worship soothes the mind and heals emotional wounds.',
      story_te: 'శివపురాణ గాథ ప్రకారం దక్షుని శాపం వల్ల క్షీణించిన చంద్రుడు శివుని ప్రార్థించి అనుగ్రహం పొందాడు. శివుడు చంద్రుని తన శిరస్సున ధరించి ‘చంద్రశేఖరుడు’ అయ్యాడు. సోమవారం మారేడు దళాలతో శివుని పూజిస్తే సకల పాపాలు హరిస్తాయి.'
    },
    2: { // Tuesday / Mangalavara
      deity_en: 'Lord Hanuman & Lord Subrahmanya Swamy',
      deity_te: 'శ్రీ ఆంజనేయ స్వామి & సుబ్రహ్మణ్య స్వామి',
      title_en: 'Mangalavara Hanuman & Skanda Pooja',
      title_te: 'మంగళవార ఆంజనేయ & సుబ్రహ్మణ్య స్వామి ఆరాధన',
      reason_en: 'Tuesday is governed by Mars (Mangala / Kuja), the planet of energy, courage, and valor. Lord Hanuman and Lord Subrahmanya are the supreme protectors who dispel Kuja dosha, debts, and fears.',
      reason_te: 'మంగళవారం అంగారక గ్రహ అధిపతియైన కుజుని దినం. ధైర్య సాహసాలకు, కార్యసిద్ధికి ఆంజనేయ స్వామి, సుబ్రహ్మణ్య స్వామిల ఆరాధన శ్రేష్ఠం. ఈ రోజు హనుమాన్ చాలీసా లేదా సుబ్రహ్మణ్య ప్రార్థన రుణాలు, భయాలను తొలగిస్తుంది.',
      mantra: {
        sanskrit: 'ॐ श्री हनुमते नमः॥\nमनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥',
        telugu: 'ఓం శ్రీ హనుమతే నమః॥\nమనోజవం మారుతతుల్యవేగం జితేంద్రియం బుద్ధిమతాం వరిష్ఠమ్। వాతాత్మజం వానరయూథముఖ్యం శ్రీరామదూతం శరణం ప్రపద్యే॥',
        translit: 'Om Shree Hanumate Namah ||\nManojavam Maaruta-Tulya-Vegam Jitendriyam Buddhimataam Varishtham | Vaataatmajam Vaanara-Yootha-Mukhyam Shree Raama Dootam Sharanam Prapadye ||',
        meaning_en: 'I take refuge in Lord Rama\'s messenger Hanuman, who is swift as the mind, fast as the wind, master of senses, foremost among the wise, and the supreme protector.',
        meaning_te: 'మనస్సు వంటి వేగం, వాయువుతో సమానమైన వేగం కలవాడు, ఇంద్రియాలను జయించినవాడు, బుద్ధిమంతులలో శ్రేష్ఠుడైన శ్రీరామదూత హనుమంతునికి శరణు వేడుతున్నాను.'
      },
      count: '11 or 108 times (or read Hanuman Chalisa)',
      count_te: '11 లేదా 108 సార్లు (లేదా హనుమాన్ చాలీసా)',
      weekday_mantra: {
        name_en: 'Mangala / Kuja Bija Mantra',
        name_te: 'కుజ బీజ మంత్రం',
        text_en: 'Om Kram Kreem Kroum Sah Bhaumaya Namah ||',
        text_te: 'ఓం క్రాం క్రీం క్రౌం సః భౌమాయ నమః॥',
        meaning_en: 'Salutations to Mangala, remover of obstacles and fear.'
      },
      puja: {
        flowers_en: 'Red flowers, Betel leaves garland (Aaku Pooja), Sindoor',
        flowers_te: 'సిందూరం, ఎర్రటి పువ్వులు, తమలపాకుల మాల',
        naivedyam_en: 'Bananas, Jaggery with roasted gram, Sweet Chana Dal',
        naivedyam_te: 'అరటిపండ్లు, బెల్లం, వేపిన శనగలు, వడపప్పు',
        charity_en: 'Feed monkeys or stray animals; donate red lentils (toor dal) to workers.',
        charity_te: 'కోతులకు లేదా జంతువులకు ఆహారం పెట్టండి; పేద శ్రామికులకు కందులు లేదా ఆహారం దానం చేయండి.'
      },
      story_en: 'In the Ramayana, Hanuman leaped across the ocean purely through devotion to Sri Rama. Devi Sita blessed him that anyone who remembers Hanuman on Tuesday will be protected from fear, evil influences, and despair.',
      story_te: 'రామాయణంలో హనుమంతుడు అచంచల రామభక్తితో సముద్రాన్ని లంఘించాడు. సీతాదేవి హనుమంతునికి చిరంజీవత్వాన్ని ప్రసాదిస్తూ, మంగళవారం ఆంజనేయుని స్మరించిన వారికి సమస్త కార్యసిద్ధి, ధైర్యం కలుగుతాయని వరమిచ్చింది.'
    },
    3: { // Wednesday / Budhavara
      deity_en: 'Lord Ganesha & Sri Krishna (Budha Devata)',
      deity_te: 'శ్రీ విఘ్నేశ్వరుడు & శ్రీకృష్ణ పరమాత్మ (బుధ గ్రహం)',
      title_en: 'Budhavara Vigneshwara & Krishna Pooja',
      title_te: 'బుధవార గణపతి & విజ్ఞాన ప్రార్థన',
      reason_en: 'Wednesday is governed by Mercury (Budha), the planet of intellect (Buddhi), education, trade, and clear communication. Lord Ganesha removes obstacles in learning and enterprise.',
      reason_te: 'బుధవారం జ్ఞానానికి, విద్యకు, వ్యాపారానికి అధిపతియైన బుధ గ్రహ దినం. విఘ్నాలను తొలగించి సద్బుద్ధిని ప్రసాదించే గణపతిని, శ్రీకృష్ణుని ఆరాధించడం వల్ల విద్యారంగంలో, ఉద్యోగంలో విశేష విజయం సాధిస్తారు.',
      mantra: {
        sanskrit: 'ॐ गं गणपतये नमः॥\nवक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
        telugu: 'ఓం గం గణపతయే నమః॥\nవక్రతుండ మహాకాయ సూర్యకోటి సమప్రభ। నిర్విఘ్నం కురు మే దేవ సర్వకార్యేషు సర్వదా॥',
        translit: 'Om Gam Ganapataye Namah ||\nVakratunda Mahaakaaya Soorya-Koti Sama-Prabha | Nirvighnam Kuru Me Deva Sarva-Kaaryeshu Sarvadaa ||',
        meaning_en: 'O Lord with the curved trunk and immense form, whose brilliance rivals millions of suns, make all our noble endeavors free of obstacles, always.',
        meaning_te: 'వంకర తొండము, గొప్ప శరీరము కలిగి, కోట్ల సూర్యుల తేజస్సుతో వెలిగే ఓ గణనాథా! నా సమస్త పనులను ఎలాంటి ఆటంకాలు లేకుండా విజయవంతం చేయుము.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      weekday_mantra: {
        name_en: 'Budha Bija Mantra',
        name_te: 'బుధ బీజ మంత్రం',
        text_en: 'Om Bram Breem Broum Sah Budhaya Namah ||',
        text_te: 'ఓం బ్రాం బ్రీం బ్రౌం సః బుధాయ నమః॥',
        meaning_en: 'Salutations to Budha, lord of discernment and eloquence.'
      },
      puja: {
        flowers_en: 'Durva grass (Garika), Yellow or green flowers',
        flowers_te: 'గరిక (దూర్వా దళాలు), పసుపు పచ్చని పువ్వులు',
        naivedyam_en: 'Modak, Jaggery, Green Moong Dal preparation (Pesalu), or Fruits',
        naivedyam_te: 'కుడుములు/మోదకాలు, బెల్లం, నానబెట్టిన పెసలు, పండ్లు',
        charity_en: 'Feed green grass or vegetables to a cow (Go Seva); donate notebooks to school children.',
        charity_te: 'గోమాతకు పచ్చగడ్డి లేదా అరటిపండ్లు తినిపించండి (గోసేవ); పేద విద్యార్థులకు పుస్తకాలు దానం చేయండి.'
      },
      story_en: 'When the devas sought wisdom to navigate turbulent times, Lord Ganesha was declared the first among gods to be worshipped (Prathama Pujya). Invoking Ganesha on Wednesday clears mental confusion and promotes peaceful learning.',
      story_te: 'సమస్త దేవతలలో మొదట పూజలందుకునే ఆదిదేవుడు వినాయకుడు. వ్యాస మహర్షి మహాభారతం చెప్పగా గణపతి తన విరిగిపోయిన దంతంతో ఏకధాటిగా లిఖించాడు. బుధవారం గణపతికి గరిక సమర్పిస్తే జ్ఞాపకశక్తి, బుద్ధికుశలత పెరుగుతాయి.'
    },
    4: { // Thursday / Guruvara
      deity_en: 'Lord Dattatreya, Sri Raghavendra Swamy & Dakshinamurthy',
      deity_te: 'శ్రీ దత్తాత్రేయుడు, శ్రీ రాఘవేంద్ర స్వామి & దక్షిణామూర్తి',
      title_en: 'Guruvara Guru Aradhana & Brihaspati Pooja',
      title_te: 'గురువార గురుకృపా దర్శనం & బృహస్పతి పూజ',
      reason_en: 'Thursday is governed by Jupiter (Guru / Brihaspati), the great preceptor and bestower of wisdom, dharma, marriage, and spiritual realization. Honouring one\'s Guru removes past karmic hurdles.',
      reason_te: 'గురువారం జగద్గురువైన దత్తాత్రేయుడు, రాఘవేంద్ర స్వామి, శిరిడీ సాయి మరియు బృహస్పతి దినం. గురువారం నాడు గురు నామస్మరణ చేయడం వల్ల జీవితంలో సరైన మార్గదర్శకత్వం, దైవానుగ్రహం, శుభకార్యాలు సిద్ధిస్తాయి.',
      mantra: {
        sanskrit: 'ॐ श्री गुरुभ्यो नमः॥\nगुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥',
        telugu: 'ఓం శ్రీ గురుభ్యో నమః॥\nగురుర్బ్రహ్మా గురుర్విష్ణుః గురుర్దేవో మహేశ్వరః। గురుః సాక్షాత్ పరబ్రహ్మ తస్మై శ్రీగురవే నమః॥',
        translit: 'Om Shree Gurubhyo Namah ||\nGurur-Brahmaa Gurur-Vishnur Gurur-Devo Maheshwarah | Guruh Saakshaat Para-Brahma Tasmai Shree-Gurave Namah ||',
        meaning_en: 'The Guru is Brahma, the Guru is Vishnu, the Guru is Lord Shiva. The Guru is truly the supreme Brahman embodied. Salutations to that revered Guru.',
        meaning_te: 'గురువే సృష్టికర్తయైన బ్రహ్మ, స్థితికారుడైన విష్ణువు, లయకారుడైన మహేశ్వరుడు. గురువే సాక్షాత్తు పరబ్రహ్మ స్వరూపము. అటువంటి శ్రీ సద్గురుదేవునికి ప్రణామాలు.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      weekday_mantra: {
        name_en: 'Brihaspati Bija Mantra',
        name_te: 'బృహస్పతి బీజ మంత్రం',
        text_en: 'Om Gram Greem Groum Sah Gurave Namah ||',
        text_te: 'ఓం గ్రాం గ్రీం గ్రౌం సః గురవే నమః॥',
        meaning_en: 'Salutations to Brihaspati, supreme teacher of gods.'
      },
      puja: {
        flowers_en: 'Yellow flowers (Marigold / Kanakambaram), Yellow sandalwood paste',
        flowers_te: 'పసుపు పచ్చని పువ్వులు (బంతి పువ్వులు), పసుపు చందనం',
        naivedyam_en: 'Boiled Chana Dal (Senagalu), Besan Ladoo, Yellow rice (Pulihora) / Bananas',
        naivedyam_te: 'గుగ్గిళ్ళు (ఉడకబెట్టిన శనగలు), బేసన్ లడ్డూ, పసుపు అరటిపండ్లు',
        charity_en: 'Feed cows with yellow bananas; donate yellow grains or assist elderly teachers/gurus.',
        charity_te: 'ఆవులకు పసుపు రంగు అరటిపండ్లు తినిపించండి; పండితులకు, గురువులకు లేదా పెద్దలకు వస్త్రదానం/అన్నదానం చేయండి.'
      },
      story_en: 'Sri Dattatreya embodies the synthesized truth of the Trimurti (Brahma, Vishnu, Shiva). Guru devotion awakens self-discipline and discernment, transforming mundane effort into spiritual fulfillment.',
      story_te: 'త్రిమూర్తుల ఏకైక స్వరూపమైన శ్రీ దత్తాత్రేయ స్వామి, మంత్రాలయ మహనీయులైన రాఘవేంద్ర స్వామి భక్తుల ఆర్తిని తీర్చే కల్పవృక్షాలు. గురువారం నేతి దీపం వెలిగించి గురు చరిత్రా పారాయణ చేస్తే సకల సంపదలు కలుగుతాయి.'
    },
    5: { // Friday / Shukravara
      deity_en: 'Goddess Mahalakshmi & Sri Lalitha Tripurasundari',
      deity_te: 'శ్రీ మహాలక్ష్మీ దేవి & శ్రీ లలితా త్రిపురసుందరి',
      title_en: 'Shukravara Mahalakshmi Pooja',
      title_te: 'శుక్రవార మహాలక్ష్మీ ఆరాధన & సౌభాగ్య ప్రార్థన',
      reason_en: 'Friday is presided over by Venus (Shukra) and Goddess Mahalakshmi, the fountainhead of wealth, grace, beauty, and domestic prosperity. Lighting a ghee lamp on Friday invites auspicious Lakshmi kataksham.',
      reason_te: 'శుక్రవారం జగన్మాతయైన శ్రీ మహాలక్ష్మికి, లలితా పరాభట్టారికకు పరమ పవిత్రమైన దినం. ఈ రోజు ఇంట్లో నేతి దీపారాధన చేసి, లక్ష్మీ అష్టోత్తర శతనామావళి పఠించడం వల్ల దారిద్య్రం తొలగి, సిరిసంపదలు, సౌభాగ్యం వర్ధిల్లుతాయి.',
      mantra: {
        sanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः॥\nसर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
        telugu: 'ఓం శ్రీం హ్రీం క్లీం మహాలక్ష్మ్యై నమః॥\nసర్వమంగళమాంగళ్యే శివే సర్వార్థసాధికే। శరణ్యే త్ర్యంబకే గౌరి నారాయణి నమోస్తు తే॥',
        translit: 'Om Shreem Hreem Kleem Mahaa-Lakshmyai Namah ||\nSarva-Mangala-Maangalye Shive Sarvaartha-Saadhike | Sharanye Tryambake Gauri Naaraayani Namo-stute ||',
        meaning_en: 'O auspicious Mother, who fulfills all righteous aims, shelter of all worlds, the divine power Narayani, we bow to you with deepest devotion.',
        meaning_te: 'సకల మంగళాలలో అత్యంత మంగళకరమైనదానా, సకలార్థ సాధకురాలైన పరాశక్తి, ముక్కంటి దేవియైన గౌరీ, నారాయణీ నీకు నా భక్తిపూర్వక ప్రణామాలు.'
      },
      count: '11 or 108 times (or Sri Suktam)',
      count_te: '11 లేదా 108 సార్లు (లేదా శ్రీ సూక్తం)',
      weekday_mantra: {
        name_en: 'Shukra Bija Mantra',
        name_te: 'శుక్ర బీజ మంత్రం',
        text_en: 'Om Dram Dreem Droum Sah Shukraya Namah ||',
        text_te: 'ఓం ద్రాం ద్రీం ద్రౌం సః శుక్రాయ నమః॥',
        meaning_en: 'Salutations to Shukra, bestowal of artistic gifts and prosperity.'
      },
      puja: {
        flowers_en: 'Red or Pink Lotus, Jasmine, Rose, Fragrant Kumkum',
        flowers_te: 'గులాబీలు, తామర పువ్వులు, మల్లెలు, సుగంధ పరిమళ కుంకుమ',
        naivedyam_en: 'Kheer (Payasam), Sweet Pongal, Milk sweets, Rock candy',
        naivedyam_te: 'పరమాన్నం (పాయసం), పాలు, కలకండ, పండ్లు',
        charity_en: 'Offer sweets or bangles/kumkum to married women; support underprivileged girls with food or clothing.',
        charity_te: 'సువాసినులకు తాంబూలం, గాజులు, పసుపు కుంకుమలు ఇవ్వండి; పేద మహిళలకు లేదా బాలికలకు ఆహారం అందించండి.'
      },
      story_en: 'During the churning of the cosmic ocean (Samudra Manthana), Goddess Mahalakshmi emerged bearing a lotus, choosing Sri Maha Vishnu as her consort. Worshipping her on Friday creates a home filled with joy, peace, and abundance.',
      story_te: 'క్షీరసాగర మథనంలో ఉద్భవించిన లక్ష్మీదేవి సమస్త సంపదలకు అధిదేవత. శుక్రవారం సాయంత్రం సంధ్యా దీపం వెలిగించి, శ్రీ సూక్తం చదివితే మహాలక్ష్మి స్థిరంగా కొలువై ఉంటుందని శాస్త్ర వచనం.'
    },
    6: { // Saturday / Shanivara
      deity_en: 'Lord Sri Venkateswara Swamy (Balaji) & Lord Shani',
      deity_te: 'శ్రీ వేంకటేశ్వర స్వామి (తిరుమల బాలాజీ) & శనీశ్వరుడు',
      title_en: 'Shanivara Venkateswara & Shani Aradhana',
      title_te: 'శనివార వేంకటేశ్వర దర్శనం & శని శాంతి ప్రార్థన',
      reason_en: 'Saturday is dedicated to Lord Venkateswara (the Kaliyuga avatar of Vishnu) and Lord Shani. Lighting a sesame oil lamp on Saturday dissolves Saturnian afflictions (Sade Sati, Ashtama Shani) and grants relief from debts and chronic worries.',
      reason_te: 'శనివారం కలియుగ ప్రత్యక్ష దైవమైన తిరుమల శ్రీ వేంకటేశ్వర స్వామికి, న్యాయాధిపతియైన శనీశ్వరునికి అత్యంత ప్రీతిపాత్రమైన దినం. శనివారం నువ్వుల నూనెతో దీపం వెలిగిస్తే శని దోషాలు, రుణబాధలు తొలగి సకల సంక్షేమం కలుగుతుంది.',
      mantra: {
        sanskrit: 'ॐ नमो वेङ्कटेशाय॥\nॐ नीलाञ्जन समाभासं रविपुत्रं यमाग्रजम्। छायामार्तण्ड सम्भूतं तं नमामि शनैश्चरम्॥',
        telugu: 'ఓం నమో వేంకటేశాయ॥\nఓం నీలాంజన సమాభాసం రవిపుత్రం యమాగ్రజమ్। ఛాయామారండ సంభూతం తం నమామి శనైశ్చరమ్॥',
        translit: 'Om Namo Venkateshaaya ||\nOm Neelaanjana Samaabhaasam Ravi-Putram Yamaagrajam | Chhaayaa-Maartanda Sambhootam Tam Namaami Shanaishcharam ||',
        meaning_en: 'Salutations to Lord Venkateswara, the dispeller of all sorrow. We bow to Shani, dark like blue collyrium, son of Surya and brother of Yama, who guides souls through disciplined karma.',
        meaning_te: 'ఆపద్బాంధవుడైన శ్రీ వేంకటేశ్వర స్వామికి ప్రణామాలు. నీలి కాటుక రంగు తేజస్సుతో ప్రకాశించేవాడు, సూర్యపుత్రుడు, యముని సోదరుడైన శని భగవానునికి నమస్కారాలు.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      weekday_mantra: {
        name_en: 'Shani Bija Mantra',
        name_te: 'శని బీజ మంత్రం',
        text_en: 'Om Pram Preem Proum Sah Shanaishcharaya Namah ||',
        text_te: 'ఓం ప్రాం ప్రీం ప్రౌం సః శనైశ్చరాయ నమః॥',
        meaning_en: 'Salutations to Shani, teacher of humility and justice.'
      },
      puja: {
        flowers_en: 'Blue flowers (Aparajita / Shanku Pushpam), Tulasi garland',
        flowers_te: 'తులసి దళాలు, నీలి రంగు పువ్వులు (శంఖు పూలు)',
        naivedyam_en: 'Sesame laddu (Nuvvula Undalu), Jaggery rice, Curd rice, Black grapes',
        naivedyam_te: 'నువ్వుల లడ్డూ, పులిహోర, దద్దోజనం (పెరుగన్నం)',
        charity_en: 'Light a sesame oil lamp in a temple or home; feed black dogs or crows; donate black blankets or footwear to poor laborers.',
        charity_te: 'నువ్వుల నూనెతో దీపం వెలిగించండి; కాకులకు లేదా మూగజీవాలకు ఆహారం పెట్టండి; పేద శ్రామికులకు చెప్పులు లేదా వస్త్రాలు దానం చేయండి.'
      },
      story_en: 'Lord Venkateswara promised that in Kali Yuga, sincere remembrance of his sacred name from home removes the burden of sins and bestows peace. Furthermore, Lord Shani promised Hanuman that devotees remembering Vishnu and Hanuman would remain unaffected by his malefic gaze.',
      story_te: 'కలియుగ వైకుంఠమైన తిరుమలలో వేంకటేశ్వరుడు భక్తులను ఉద్ధరించడానికి స్వయంభువుగా వెలిశాడు. శనివారం స్వామివారికి తులసి మాల సమర్పించి గోవింద నామస్మరణ చేస్తే శని బాధలు తొలగి మనశ్శాంతి లభిస్తుందని నారద పురాణం చెబుతోంది.'
    }
  };

  // Special Vratas & Festival Rules (Tithi, Paksha, Month, Nakshatra overrides)
  // Strictly zero Telugu characters in *_en fields!
  const SPECIAL_OBSERVANCES = [
    {
      id: 'atla_tadde',
      match: (p) => p.tithi.inPaksha === 3 && p.paksha.key === 'krishna' && (p.masa.sanskrit === 'Ashvina' || p.masa.sanskrit === 'Kartika'),
      name_en: 'Atla Tadde (Gauri Vratam)',
      name_te: 'అట్ల తద్దె (గౌరీ వ్రతం)',
      deity_en: 'Goddess Gauri (Parvati Devi) & Chandra Bhagavan',
      deity_te: 'శ్రీ గౌరీ దేవి (పార్వతీ దేవి) & చంద్ర భగవానుడు',
      badge_en: "Telugu Women's Sacred Vrata",
      badge_te: 'తెలుగు వారి విశిష్ట సంప్రదాయ పండుగ',
      reason_en: 'Atla Tadde is the traditional Telugu festival dedicated to Goddess Gauri. Married women observe it for marital longevity and family harmony, and unmarried women pray for a noble, caring life partner.',
      reason_te: 'అట్ల తద్దె తెలుగు వారి విశిష్ట సాంప్రదాయ పండుగ. ఆశ్వయుజ/కార్తీక బహుళ తదియ నాడు స్త్రీలు గౌరీ దేవిని ఆరాధించి, చంద్ర దర్శనం చేసుకుంటారు. సుమంగళి సౌభాగ్యం, దాంపత్య సుఖం కోసం ఈ వ్రతం చేస్తారు.',
      mantra: {
        sanskrit: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
        telugu: 'సర్వమంగళమాంగళ్యే శివే సర్వార్థసాధికే।\nశరణ్యే త్ర్యంబకే గౌరి నారాయణి నమోస్తు తే॥',
        translit: 'Sarva-Mangala-Maangalye Shive Sarvaartha-Saadhike |\nSharanye Tryambake Gauri Naaraayani Namo-stute ||',
        meaning_en: 'O Mother Gauri, the most auspicious among all auspicious beings, the fulfiller of all worthy aims, refuge of the helpless, three-eyed mother Narayani, we bow to you.',
        meaning_te: 'సకల శుభములను చేకూర్చే మంగళ స్వరూపిణి, సకల పురుషార్థాలను సిద్ధించే తల్లి, ముక్కంటి పరమేశ్వరుని అర్ధాంగి అయిన గౌరీ నారాయణి నీకు ప్రణామాలు.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      puja: {
        flowers_en: 'Fragrant pink and yellow flowers, Marigold, Jasmine, Kumkum',
        flowers_te: 'పసుపు, కుంకుమ, తామరలు, మల్లెలు, గులాబీలు',
        naivedyam_en: 'Traditional small Atlu (mini dosas offered in 11 numbers), Jaggery, Fruits',
        naivedyam_te: '11 చిన్న అట్లు (దోశలు), బెల్లం, అరటిపండ్లు, పాయసం',
        charity_en: 'Share Atlu with family and neighbors; offer Vayanam (fruits, betel leaves, turmeric, and bangles) to elderly married women.',
        charity_te: 'ముత్తైదువులకు 11 అట్లు, తాంబూలం, పసుపు కుంకుమలతో కూడిన వాయనం ఇవ్వండి; గౌరవపూర్వకంగా ఆశీర్వాదం తీసుకోండి.'
      },
      special_practice_en: 'Traditionally includes morning swings (Uyyala), Gorintaku (henna) on palms, daytime fasting (optional for health reasons), and offering Arghya to the Moon upon moonrise.',
      special_practice_te: 'ఉదయాన్నే గోరింటాకు పెట్టుకోవడం, ఉయ్యాలలు ఊగడం, రోజంతా ఉపవాసం ఉండి సాయంత్రం చంద్ర దర్శనం తర్వాత అట్ల నైవేద్యం సమర్పించి వ్రతం పూర్తి చేసుకోవడం ఆచారం.',
      story_en: 'According to Telugu sthala purana, Goddess Gauri observed this very penance before uniting in joyous marriage with Lord Shiva. Chandra’s soothing rays after moonrise bless married life with tranquility and deep mutual affection.',
      story_te: 'శివపురాణం ప్రకారం పార్వతీ దేవి పరమశివుని భర్తగా పొందడానికి ఈ అట్ల తద్దె వ్రతాన్ని ఆచరించిందని ప్రతీతి. చంద్రోదయం తర్వాత చంద్రునికి, గౌరీ దేవికి అర్ఘ్యం ఇచ్చి పూజిస్తే దాంపత్యంలో కలతలు సమసిపోయి అనురాగం వెల్లివిరుస్తుంది.'
    },
    {
      id: 'ekadashi',
      match: (p) => p.tithi.inPaksha === 11,
      name_en: 'Ekadashi Harivasara Vratam',
      name_te: 'ఏకాదశీ హరివాసర వ్రతం',
      deity_en: 'Lord Sri Maha Vishnu & Sri Venkateswara Swamy',
      deity_te: 'శ్రీ మహావిష్ణువు & శ్రీ వేంకటేశ్వర స్వామి',
      badge_en: 'Sacred Harivasara Day',
      badge_te: 'హరివాసర పరమ పవిత్ర దినం',
      reason_en: 'Ekadashi is the supreme day of spiritual cleansing and Vishnu devotion. The 11th tithi represents transcending the 5 sense organs, 5 action organs, and the mind, directly directing our focus toward the Divine.',
      reason_te: 'ఏకాదశి సాక్షాత్తు శ్రీ మహావిష్ణువు శరీరము నుండి ఉద్భవించిన పవిత్ర తిథి. దశేంద్రియాలను, మనస్సును భగవంతుని యందు లగ్నం చేసి జపం చేయడం వల్ల అనంత పుణ్యఫలం, మోక్షం లభిస్తుంది.',
      mantra: {
        sanskrit: 'ॐ नमो भगवते वासुदेवाय॥\nशान्ताकारं भुजगशयनं पद्मनाभं सुरेशं विश्वाधारं गगनसदृशं मेघवर्णं शुभाङ्गम्।\nलक्ष्मीकान्तं कमलनयनं योगिभिर्ध्यानगम्यं वन्दे विष्णुं भवभयहरं सर्वलोकैकनाथम्॥',
        telugu: 'ఓం నమో భగవతే వాసుదేవాయ॥\nశాంతాకారం భుజగశయనం పద్మనాభం సురేశం విశ్వాధారం గగనసదృశం మేఘవర్ణం శుభాంగమ్।\nలక్ష్మీకాంతం కమలనయనం యోగిభిర్ధ్యానగమ్యం వందే విష్ణుం భవభయహరం సర్వలోకైకనాథమ్॥',
        translit: 'Om Namo Bhagavate Vaasudevaaya ||\nShaantaakaaram Bhujaga-Shayanam Padma-Naabham Suresham Vishwaadhaaram Gagana-Sadrisham Megha-Varnam Shubhaangam |\nLakshmee-Kaantam Kamala-Nayanam Yogibhir-Dhyaana-Gamyam Vande Vishnum Bhava-Bhaya-Haram Sarva-Lokaika-Naatham ||',
        meaning_en: 'Salutations to the peaceful Lord Vasudeva, resting upon the serpent, from whose navel springs the cosmic lotus, ruler of all deities, foundation of the universe, dispeller of worldly fear.',
        meaning_te: 'శాంత స్వరూపుడు, ఆదిశేషునిపై శయనించినవాడు, పద్మనాభుడు, సమస్త జగత్తునకు ఆధారమైన శ్రీమహావిష్ణువునకు భక్తితో నమస్కరిస్తున్నాను.'
      },
      count: '108 times (or chant Vishnu Sahasranamam)',
      count_te: '108 సార్లు (లేదా విష్ణు సహస్రనామ పారాయణ)',
      puja: {
        flowers_en: 'Fresh Tulasi leaves, Yellow Chrysanthemums, Lotus',
        flowers_te: 'తులసి దళాలు, పసుపు చామంతి పువ్వులు',
        naivedyam_en: 'Fruits, Milk, Dry fruits, Sabudana / Non-grain light food',
        naivedyam_te: 'పండ్లు, పాలు, ఎండు ఖర్జూరాలు, తులసి తీర్థం',
        charity_en: 'Feed cows with green grass and bananas; distribute food/grains to the hungry tomorrow during Dwadashi Parana.',
        charity_te: 'ఆవులకు అరటిపండ్లు తినిపించండి; ద్వాదశి పారణ సమయంలో పేదలకు అన్నదానం చేయండి.'
      },
      special_practice_en: 'Fast from grains (rice, wheat) if your health permits. For beginners or those with health needs, eating fruits and milk is fully respected.',
      special_practice_te: 'ధాన్యాలు తీసుకోకుండా పాలు, పండ్లతో ఉపవాసం ఉండడం శ్రేష్ఠం. ఆరోగ్యం సహకరించని వారు నిష్టగా భగవన్నామ స్మరణ చేస్తే సరిపోతుంది.',
      story_en: 'The Padma Purana highlights that a maiden named Ekadashi sprang from Lord Vishnu to slay the demon Mura. Pleased, Vishnu granted that anyone who fasts and remembers him on Ekadashi attains inner purity and freedom from past sins.',
      story_te: 'పద్మ పురాణంలో మురాసురుడనే రాక్షసుని సంహరించిన ఏకాదశి దేవికి విష్ణుమూర్తి వరమిస్తూ—ఈ రోజున తనను భక్తితో పూజించిన వారికి జన్మజన్మల పాపాల నుండి విముక్తి కలుగుతుందని అనుగ్రహించారు.'
    },
    {
      id: 'pradosham',
      match: (p) => p.tithi.inPaksha === 13,
      name_en: 'Pradosha Vratam (Trayodashi Sandhya)',
      name_te: 'ప్రదోష వ్రతం (త్రయోదశి సంధ్యా సమయం)',
      deity_en: 'Lord Shiva & Sri Nandi Deva',
      deity_te: 'పరమశివుడు (సోమస్కందుడు) & నందీశ్వరుడు',
      badge_en: 'Twilight Shiva Worship Window',
      badge_te: 'సంధ్యాకాల శివ ప్రదోష దర్శనం',
      reason_en: 'Trayodashi twilight (1.5 hours before and after sunset) is Pradosham—the sacred hour when Lord Shiva performs his cosmic dance (Ananda Tandava) to bring harmony to all realms.',
      reason_te: 'త్రయోదశి నాటి సూర్యాస్తమయ సమయాన్ని ప్రదోష కాలం అంటారు. ఈ సమయంలో పరమశివుడు సమస్త దేవతల సమక్షంలో ఆనంద తాండవం చేస్తాడని, ఆ సమయంలో శివుని పూజిస్తే సమస్త కష్టాలు నశిస్తాయని విశ్వాసం.',
      mantra: {
        sanskrit: 'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि। तन्नो रुद्रः प्रचोदयात्॥\nॐ नमः शिवाय॥',
        telugu: 'ఓం తత్పురుషాయ విద్మహే మహాదేవాయ ధీమహి। తన్నో రుద్రః ప్రచోదయాత్॥\nఓం నమః శివాయ॥',
        translit: 'Om Tatpurushaaya Vidmahe Mahaadevaaya Dheemahi | Tanno Rudrah Prachodayaat ||\nOm Namah Shivaaya ||',
        meaning_en: 'We meditate upon that supreme Purusha, Lord Mahadeva. May that Rudra inspire our spiritual wisdom and dispel darkness.',
        meaning_te: 'మహాదేవుడైన ఆ పరమ పురుషుని మేము ధ్యానిస్తున్నాము. ఆ రుద్ర దేవుడు మా బుద్ధిని సత్య మార్గంలో నడిపించుగాక.'
      },
      count: '11, 54, or 108 times during sunset',
      count_te: 'సూర్యాస్తమయ సమయంలో 108 సార్లు',
      puja: {
        flowers_en: 'Bilva leaves, Jasmine, White flowers',
        flowers_te: 'బిల్వ పత్రాలు (మారేడు దళాలు), తెల్లటి పువ్వులు',
        naivedyam_en: 'Panchamritam, Sweet Kheer, Honey, Fruits',
        naivedyam_te: 'పంచామృతాలు, పాయసం, తేనె, అరటిపండ్లు',
        charity_en: 'Light a ghee lamp in a Shiva temple or home altar; donate oil or milk for temple worship.',
        charity_te: 'శివాలయంలో లేదా ఇంట్లో ప్రదోష వేళ ఆవునేతి దీపం వెలిగించండి; శివాభిషేకానికి పాలు లేదా బిల్వాలు సమర్పించండి.'
      },
      special_practice_en: 'Perform prayers specifically around sunset (check Sunset timing in the Vedic Timings card). Worshipping Nandi and viewing Shiva through Nandi\'s horns is considered auspicious.',
      special_practice_te: 'సూర్యాస్తమయానికి ముందూ వెనుక ప్రదోష వేళ శివారాధన చేయండి. నందీశ్వరుని దర్శనం చేసుకొని శివునికి అభిషేకం లేదా దీపారాధన సమర్పించండి.',
      story_en: 'When the devas and asuras churned the ocean, the deadly poison Halahala emerged, threatening creation. Lord Shiva consumed the poison to protect the worlds, holding it in his throat. The devas celebrated with gratitude during Pradosham.',
      story_te: 'క్షీరసాగర మథనంలో లోకాలను దహించివేసే హాలాహలం పుట్టినప్పుడు, పరమేశ్వరుడు లోకరక్షణార్థం ఆ విషాన్ని తన కంఠంలో బంధించి నీలకంఠుడయ్యాడు. ఆ కృతజ్ఞతతో సమస్త దేవతలు ప్రదోష వేళ శివుని స్తుతించారు.'
    },
    {
      id: 'sankashti_chaturthi',
      match: (p) => p.tithi.inPaksha === 4 && p.paksha.key === 'krishna',
      name_en: 'Sankashti Chaturthi (Sankatahara Ganapati Vratam)',
      name_te: 'సంకష్టహర చతుర్థి (సంకటహర గణపతి వ్రతం)',
      deity_en: 'Lord Sankatahara Ganapati & Chandra Bhagavan',
      deity_te: 'శ్రీ సంకటహర గణపతి & చంద్రుడు',
      badge_en: 'Obstacle & Distress Removal Vrata',
      badge_te: 'సకల సంకట నివారణా వ్రతం',
      reason_en: 'Krishna Chaturthi is dedicated to Sankatahara Ganapati, the destroyer of crises and debts. Devotees fast until evening and perform puja and moon darshanam to eliminate major life hurdles.',
      reason_te: 'కృష్ణ పక్ష చవితి సంకటహర చతుర్థిగా ప్రసిద్ధి. ఎంతటి కష్టాలనైనా, రుణ బాధలనైనా తొలగించే సమర్థుడు సంకటహర గణపతి. రోజంతా ఉపవాసం ఉండి, చంద్రోదయం తర్వాత పూజ చేయడం విశేష ఫలాన్నిస్తుంది.',
      mantra: {
        sanskrit: 'ॐ गं गणपतये नमः॥\nगजाननं भूतगणादिसेवितं कपित्थजम्बूफलसारभक्षितम्।\nउमासुतं शोकविनाशकारणं नमामि विघ्नेश्वरपादपङ्कजम्॥',
        telugu: 'ఓం గం గణపతయే నమః॥\nగజాననం భూతగణాదిసేవితం కపిత్థజంబూఫలసారభక్షితమ్।\nఉమాసుతం శోకవినాశకారణం నమామి విఘ్నేశ్వరపాదపంకజమ్॥',
        translit: 'Om Gam Ganapataye Namah ||\nGajaananam Bhoota-Ganaadi-Sevitam Kapittha-Jamboo-Phala-Saara-Bhakshitam |\nUmaa-Sutam Shoka-Vinaasha-Kaaranam Namaami Vighneshwara-Paada-Pankajam ||',
        meaning_en: 'I bow to the elephant-faced Lord, son of Uma, who partakes of the wood-apple and rose-apple, attended by celestial beings, the supreme destroyer of all grief.',
        meaning_te: 'ఏనుగు ముఖము కలవాడు, భక్త గణాలచే పూజింపబడువాడు, ఉమాదేవి సుతుడు, సమస్త శోకాలను దూరం చేసే విఘ్నేశ్వరుని పాదపద్మాలకు నమస్కరిస్తున్నాను.'
      },
      count: '21 or 108 times',
      count_te: '21 లేదా 108 సార్లు (సంకటనాశన గణేశ స్తోత్రం)',
      puja: {
        flowers_en: 'Durva grass (21 Garika blades), Red hibiscus',
        flowers_te: '21 గరిక పోచలు, ఎరుపు మందార పువ్వులు',
        naivedyam_en: 'Modak / Kudumulu, Jaggery, Coconut, Sesame sweets',
        naivedyam_te: 'కుడుములు/ఉండ్రాళ్ళు, బెల్లం, కొబ్బరికాయ, పండ్లు',
        charity_en: 'Feed grass and jaggery to cows; offer food to temple visitors or poor laborers.',
        charity_te: 'ఆవుకు బెల్లం, అరటిపండ్లు తినిపించండి; అన్నార్తులకు ఆకలి తీర్చండి.'
      },
      special_practice_en: 'Offer prayer to Ganesha, then perform Moon arghya after moonrise. (If Tuesday, it is celebrated as Angarika Chaturthi, which carries multiplied power).',
      special_practice_te: 'సాయంత్రం చంద్రోదయ దర్శనం చేసుకుని, చంద్రునికి మరియు వినాయకునికి అర్ఘ్యం సమర్పించి నైవేద్యం తీసుకోవడం సంప్రదాయం.',
      story_en: 'Ganesha Purana recounts that King Kritavirya and Sage Bhrigu regained lost fortunes and peace by observing Sankatahara Chaturthi. It brings clarity during times of career or financial stagnation.',
      story_te: 'గణేశ పురాణం ప్రకారం పూర్వం దేవతలు సైతం తమ ఆపదల నివారణ కోసం సంకష్టహర చతుర్థి వ్రతాన్ని ఆచరించి విజయం సాధించారు. నమ్మకంతో 21 గరికలతో పూజిస్తే అడ్డంకులన్నీ తొలగిపోతాయి.'
    },
    {
      id: 'vinayaka_chaturthi',
      match: (p) => p.tithi.inPaksha === 4 && p.paksha.key === 'shukla',
      name_en: 'Shukla Chaturthi (Varada Vinayaka Pooja)',
      name_te: 'శుక్ల చతుర్థి (వరద వినాయక పూజ)',
      deity_en: 'Lord Siddhi Vinayaka',
      deity_te: 'శ్రీ సిద్ధి వినాయక స్వామి',
      badge_en: 'Auspicious Beginning Day',
      badge_te: 'కార్యసిద్ధి & శుభప్రద దినం',
      reason_en: 'Waxing 4th tithi is dedicated to Varada Vinayaka (the boon-bestowing Ganesha). It is celebrated for removing new hurdles in enterprise, building homes, and starting studies.',
      reason_te: 'శుక్ల పక్ష చవితి కోరిన వరాలనిచ్చే వరద వినాయకునికి అంకితం. నూతన కార్యాలు ప్రారంభించడానికి, విఘ్నాలు తొలగి శుభాలు కలగడానికి గణపతి పూజ శ్రేష్ఠం.',
      mantra: {
        sanskrit: 'ॐ श्रीं ह्रीं क्लीं ग्लौं गं गणपतये वर वरद सर्वजनं मे वशमानय स्वाहा॥',
        telugu: 'ఓం శ్రీం హ్రీం క్లీం గ్లౌం గం గణపతయే వర వరద సర్వజనం మే వశమానయ స్వాహా॥',
        translit: 'Om Shreem Hreem Kleem Gloum Gam Ganapataye Vara Varada Sarvajanam Me Vashamaanaya Swaahaa ||',
        meaning_en: 'Salutations to the supreme boon-giving Ganapati, bestow clarity, harmony, and victory in all good endeavors.',
        meaning_te: 'కోరిన వరాలనిచ్చే వరద వినాయకునికి నమస్కారాలు. మా సమస్త ప్రయత్నాలలో విజయాన్ని ప్రసాదించుము.'
      },
      count: '21 or 108 times',
      count_te: '21 లేదా 108 సార్లు',
      puja: {
        flowers_en: 'Garika (Durva grass), Red flowers, Modak',
        flowers_te: 'గరిక, ఎర్రటి పువ్వులు, మోదకాలు',
        naivedyam_en: 'Jaggery, Coconuts, Modaks',
        naivedyam_te: 'బెల్లం, కొబ్బరి, కుడుములు, అరటిపండ్లు',
        charity_en: 'Donate stationery or financial help to needy students.',
        charity_te: 'పేద విద్యార్థులకు చదువు కోసం పుస్తకాలు లేదా సహాయం చేయండి.'
      },
      story_en: 'Shukla Chaturthi marks the divine presence of Ganesha as the cosmic architect who clears confusion before creation.',
      story_te: 'శుక్ల చవితి నాడు వినాయకుని పూజించిన వారికి ఎటువంటి ఆటంకాలు ఎదురవకుండా సకల కార్యములు సులభంగా నెరవేరుతాయి.'
    },
    {
      id: 'pournami',
      match: (p) => p.tithi.inPaksha === 15 && p.paksha.key === 'shukla',
      name_en: 'Pournami (Sri Satyanarayana Swamy & Lalitha Pooja)',
      name_te: 'పౌర్ణమి (శ్రీ సత్యనారాయణ స్వామి & లలితా దేవి వ్రతం)',
      deity_en: 'Lord Sri Satyanarayana Swamy & Goddess Lalitha Tripurasundari',
      deity_te: 'శ్రీ సత్యనారాయణ స్వామి & లలితా త్రిపురసుందరి',
      badge_en: 'Full Moon Fulfillment Day',
      badge_te: 'సంపూర్ణ పూర్ణిమా పుణ్యదినం',
      reason_en: 'Pournami is the pinnacle of the waxing cycle when the moon is 100% illuminated. Worshipping Satyanarayana Swamy and Mother Lalitha brings total family harmony, prosperity, and truth in relationships.',
      reason_te: 'పౌర్ణమి సంపూర్ణ అమృత కిరణాలు ప్రసరించే పర్వదినం. ఈ రోజు శ్రీ సత్యనారాయణ వ్రతం చేయడం, లలితా సహస్రనామ పారాయణ చేయడం వల్ల గృహంలో అష్టైశ్వర్యాలు, సంపూర్ణ ఆనందం వెల్లివిరుస్తాయి.',
      mantra: {
        sanskrit: 'ॐ श्री सत्यनारायणाय नमः॥\nॐ ऐं ह्रीं श्रीं ललितायै नमः॥',
        telugu: 'ఓం శ్రీ సత్యనారాయణాయ నమః॥\nఓం ఐం హ్రీం శ్రీం లలితాయై నమః॥',
        translit: 'Om Shree Satya-Naaraayanaaya Namah ||\nOm Aim Hreem Shreem Lalitaayai Namah ||',
        meaning_en: 'Salutations to Lord Satyanarayana, the embodiment of Truth, and Goddess Lalitha, supreme mother of grace and bliss.',
        meaning_te: 'సత్యస్వరూపుడైన సత్యనారాయణ స్వామికి, ఆనందమయి అయిన లలితా పరాభట్టారికకు సాష్టాంగ ప్రణామాలు.'
      },
      count: '108 times (or Sri Lalitha Sahasranamam)',
      count_te: '108 సార్లు (లేదా లలితా సహస్రనామ స్తోత్రం)',
      puja: {
        flowers_en: 'Fragrant Lotus, Jasmine, Kumkum, Turmeric',
        flowers_te: 'తామర పూలు, మల్లెలు, సుగంధ పరిమళ పుష్పాలు',
        naivedyam_en: 'Satyanarayana Prasadam (Rava, Ghee, Jaggery/Sugar, Milk, Banana pieces)',
        naivedyam_te: 'సత్యనారాయణ స్వామి ప్రసాదం (గోధుమ రవ్వ, నెయ్యి, పాలు, బెల్లం, అరటి ముక్కలు)',
        charity_en: 'Distribute sweet prasadam to family, friends, and neighbors; donate white grains to the poor.',
        charity_te: 'పౌర్ణమి ప్రసాదాన్ని అందరికీ పంచిపెట్టండి; నిరుపేదలకు అన్నదానం చేయండి.'
      },
      special_practice_en: 'Light a ghee lamp in the evening facing east. Meditate under the moonlight for mental serenity.',
      special_practice_te: 'సాయంత్రం సంధ్యా సమయాన ఇంటి ముంగిట లేదా పూజ గదిలో నేతి దీపాలు వెలిగించి, చంద్రునికి నమస్కరించండి.',
      story_en: 'Skanda Purana relates that Lord Vishnu taught the Satyanarayana Vrata to sage Narada as the simplest and most potent remedy for the griefs of Kali Yuga.',
      story_te: 'స్కాంద పురాణం ప్రకారం కలియుగంలో మానవుల కష్టాలను తొలగించడానికి నారద మహర్షికి సాక్షాత్తు శ్రీమహావిష్ణువు ఉపదేశించిన అత్యంత మహిమాన్వితమైన వ్రతమే సత్యనారాయణ వ్రతం.'
    },
    {
      id: 'amavasya',
      match: (p) => p.tithi.inPaksha === 15 && p.paksha.key === 'krishna',
      name_en: 'Amavasya (New Moon & Pitru / Shiva Shanti)',
      name_te: 'అమావాస్య (పితృ తర్పణ & శివ శాంతి ప్రార్థన)',
      deity_en: 'Pitru Devatas, Lord Shiva & Lord Hanuman',
      deity_te: 'పితృ దేవతలు, పరమశివుడు & ఆంజనేయ స్వామి',
      badge_en: 'Ancestral Gratitude & Protection Day',
      badge_te: 'పితృ తర్పణ & ఆత్మశాంతి దినం',
      reason_en: 'Amavasya is the still point of the lunar cycle. Honoring ancestors (Pitrus) and praying to Lord Shiva or Hanuman dissolves family curses, generational debts, and invisible burdens.',
      reason_te: 'అమావాస్య పితృ దేవతల ఆశీస్సులు పొందే పుణ్యదినం. పెద్దలను స్మరించుకోవడం, కాకులకు ఆహారం పెట్టడం, శివార్చన చేయడం వల్ల పితృ దోషాలు తొలగి కుటుంబంలో శాంతి వర్ధిల్లుతుంది.',
      mantra: {
        sanskrit: 'ॐ पितृभ्यो नमः॥\nॐ नमः शिवाय॥\nॐ हं हनुमते रुद्रात्मकाय हुं फट्॥',
        telugu: 'ఓం పితృభ్యో నమః॥\nఓం నమః శివాయ॥\nఓం హం హనుమతే రుద్రాత్మకాయ హుం ఫట్॥',
        translit: 'Om Pitribhyo Namah ||\nOm Namah Shivaaya ||\nOm Ham Hanumate Rudraatmakaaya Hum Phat ||',
        meaning_en: 'Salutations to the ancestors; peace to all souls. Salutations to Lord Shiva and Hanuman, our eternal protectors.',
        meaning_te: 'మా వంశ పితృ దేవతలకు ప్రణామాలు. సకల భయాలను హరించే పరమశివునికి, ఆంజనేయ స్వామికి ప్రణామాలు.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు',
      puja: {
        flowers_en: 'White flowers, Black sesame seeds (Til), Ghee lamp',
        flowers_te: 'నువ్వులు, తెల్లటి పువ్వులు, తులసి',
        naivedyam_en: 'Cooked rice with sesame seeds, Curd rice, Fruits',
        naivedyam_te: 'నువ్వులతో కలిపిన అన్నం, పండ్లు, దద్దోజనం',
        charity_en: 'Feed crows, cows, or stray dogs before noon; donate food, sesame, or warm clothes to the elderly.',
        charity_te: 'మధ్యాహ్న భోజనానికి ముందు కాకులకు, ఆవులకు ఆహారం పెట్టండి; పేద వృద్ధులకు అన్నదానం చేయండి.'
      },
      special_practice_en: 'Maintain a peaceful, reflective state of mind. Avoid starting major aggressive transactions; focus on settling debts, cleansing the house, and meditating.',
      special_practice_te: 'ఇంటిని శుభ్రం చేసుకుని, దీపం వెలిగించి, ప్రశాంతమైన చిత్తంతో పితృదేవతల ఆశీర్వాదం అందుకోండి.',
      story_en: 'Scriptures state that on Amavasya, the sun and moon come together in the sky. Ancestral spirits visit to bless descendants who remember them with gratitude.',
      story_te: 'సూర్య చంద్రులు ఒకే రాశిలో కలిసే సమయమే అమావాస్య. ఈ రోజు మన పూర్వీకులను కృతజ్ఞతతో స్మరిస్తే వారి ఆశీస్సులు మన వంశాభివృద్ధికి రక్షగా నిలుస్తాయి.'
    },
    {
      id: 'masa_shivaratri',
      match: (p) => p.tithi.inPaksha === 14 && p.paksha.key === 'krishna',
      name_en: 'Masa Shivaratri (Monthly Shivaratri)',
      name_te: 'మాస శివరాత్రి (నిత్య శివారాధన)',
      deity_en: 'Lord Shiva Mahadeva (Lingodbhava)',
      deity_te: 'పరమశివుడు (లింగోద్భవ మూర్తి)',
      badge_en: 'Monthly Auspicious Shiva Night',
      badge_te: 'మాస శివరాత్రి పుణ్యకాలం',
      reason_en: 'Krishna Chaturdashi is Masa Shivaratri. Chanting Shiva mantras on this night dissolves sins accumulated during the month and anchors the mind in transcendent peace.',
      reason_te: 'ప్రతి నెలా కృష్ణ చతుర్దశి నాడు మాస శివరాత్రి వస్తుంది. రాత్రి వేళ లింగోద్భవ సమయాన శివనామస్మరణ చేస్తే సకల పాపాలు హరించి, మనోవాంఛలు నెరవేరుతాయి.',
      mantra: {
        sanskrit: 'ॐ नमः शिवाय॥\nकर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्।\nसदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
        telugu: 'ఓం నమః శివాయ॥\nకర్పూరగౌరం కరుణావతారం సంసారసారం భుజగేంద్రహారమ్।\nసదావసంతం హృదయారవిందే భవం భవానీసహితం నమామి॥',
        translit: 'Om Namah Shivaaya ||\nKarpoora-Gauram Karunaa-Vataaram Samsaara-Saaram Bhujagendra-Haaram |\nSadaa-Vasantam Hridayaaravinde Bhavam Bhavaanee-Sahitam Namaami ||',
        meaning_en: 'White like camphor, the incarnation of compassion, essence of existence, wearing the king of serpents as garland, dwelling forever in the lotus of my heart, I bow to Shiva with Goddess Bhavani.',
        meaning_te: 'కర్పూర కాంతి కలవాడు, కరుణామయుడు, భవానీ సహితుడై నా హృదయకమలంలో నివసించే పరమేశ్వరునికి నమస్కరిస్తున్నాను.'
      },
      count: '108 times (or Bilvashtakam)',
      count_te: '108 సార్లు (లేదా బిల్వాష్టకం)',
      puja: {
        flowers_en: 'Bilva patra, White flowers, Vibhuti, Sandalwood',
        flowers_te: 'మారేడు దళాలు, విభూతి, చందనం',
        naivedyam_en: 'Milk, Honey, Bananas, Kheer',
        naivedyam_te: 'పచ్చి పాలు, తేనె, అరటిపండ్లు, పరమాన్నం',
        charity_en: 'Light a deepam in a Shiva shrine; feed the hungry.',
        charity_te: 'శివాలయ దర్శనం చేసుకోండి; పేదలకు పండ్లు లేదా అన్నదానం చేయండి.'
      },
      story_en: 'Lord Shiva manifested as an infinite column of light (Jyotirlinga) on Shivaratri, reminding the cosmos that humility and truth transcend ego.',
      story_te: 'మహావిష్ణువు, బ్రహ్మదేవులకు తన అనంత తేజస్సును లింగరూపంలో దర్శనమిచ్చిన పవిత్ర కాలం. మాస శివరాత్రి నాడు మారేడు దళాలతో పూజించిన వారికి జన్మరాహిత్యం లభిస్తుంది.'
    },
    {
      id: 'skanda_shashti',
      match: (p) => p.tithi.inPaksha === 6 && p.paksha.key === 'shukla',
      name_en: 'Skanda Shashti (Lord Subrahmanya Swamy Vrata)',
      name_te: 'స్కంద షష్ఠి (సుబ్రహ్మణ్య స్వామి వ్రతం)',
      deity_en: 'Lord Subrahmanya Swamy (Karthikeya / Murugan)',
      deity_te: 'శ్రీ సుబ్రహ్మణ్య స్వామి (కార్తికేయుడు)',
      badge_en: 'Victory & Valour Vrata',
      badge_te: 'శతృ నివారణ & సంతాన భాగ్య వ్రతం',
      reason_en: 'Shukla Shashti is consecrated to Lord Subrahmanya Swamy. Praying to Skanda removes Kuja dosha, protects children, gives victory in righteous battles, and clears skin and bone ailments.',
      reason_te: 'శుక్ల పక్ష షష్ఠి సుబ్రహ్మణ్య స్వామికి అత్యంత విశిష్టమైన తిథి. నాగదోష నివారణకు, సంతాన భాగ్యానికి, శతృ భయాల నుండి రక్షణకు సుబ్రహ్మణ్య స్వామి ఆరాధన శ్రేష్ఠమైనది.',
      mantra: {
        sanskrit: 'ॐ शरवणभवाय नमः॥\nसुब्रह्मण्याय षण्मुखाय कार्तिकेयाय धीमहि।',
        telugu: 'ఓం శరవణభవాయ నమః॥\nసుబ్రహ్మణ్యాయ షణ్ముఖాయ కార్తికేయాయ ధీమహి।',
        translit: 'Om Sharavana-Bhavaaya Namah ||\nSubrahmanyaaya Shanmukhaaya Kaartikeyaaya Dheemahi ||',
        meaning_en: 'Salutations to the six-faced Lord Subrahmanya, born in the sacred Sharavana forest, protector of the universe.',
        meaning_te: 'శరవణ భవుడు, ఆరు ముఖములు కల కార్తికేయుడు, దేవసేనానియైన సుబ్రహ్మణ్య స్వామికి నమస్కరిస్తున్నాను.'
      },
      count: '21 or 108 times (or Subrahmanya Ashtakam)',
      count_te: '21 లేదా 108 సార్లు (సుబ్రహ్మణ్యాష్టకం)',
      puja: {
        flowers_en: 'Red oleander, Marigold, Red flowers',
        flowers_te: 'ఎర్రటి గన్నేరు పువ్వులు, మందారాలు',
        naivedyam_en: 'Panchamritam, Honey, Boiled Bengal gram (Senagalu), Fruit salad',
        naivedyam_te: 'పంచామృతం, తేనె, ఉడికించిన శనగలు, పండ్లు',
        charity_en: 'Feed birds and cows; support young students or soldiers.',
        charity_te: 'పిల్లలకు విద్యా సహాయం చేయండి; ఆవుకు అరటిపండ్లు సమర్పించండి.'
      },
      story_en: 'Lord Subrahmanya conquered the demon Surapadman on Shashti, restoring peace to the cosmos and earning the name Devasenapati.',
      story_te: 'దేవతలను వేధించిన శూరపద్మాసురుని సంహరించి దేవసేనానిగా లోకరక్షణ చేసిన వీరుడు సుబ్రహ్మణ్యుడు. షష్ఠి వ్రతంతో స్వామిని ఆరాధిస్తే సకల విజయాలు సిద్ధించును.'
    },
    {
      id: 'durgashtami',
      match: (p) => p.tithi.inPaksha === 8 && p.paksha.key === 'shukla',
      name_en: 'Durgashtami (Goddess Durga Pooja)',
      name_te: 'దుర్గాష్టమి (శ్రీ కనకదుర్గా దేవి ఆరాధన)',
      deity_en: 'Goddess Durga / Mahishasuramardini',
      deity_te: 'శ్రీ కనకదుర్గా దేవి / మహిషాసురమర్దిని',
      badge_en: 'Divine Mother Protection Day',
      badge_te: 'శక్తి సంరక్షణ పుణ్యదినం',
      reason_en: 'Shukla Ashtami is celebrated as Durgashtami. Worshipping Goddess Durga grants inner courage, shields against negativity, and brings professional triumphs.',
      reason_te: 'శుక్ల పక్ష అష్టమి దుర్గాష్టమిగా పూజింపబడుతుంది. అమ్మవారిని దుర్గా స్తోత్రాలతో అర్చించడం వల్ల శత్రు భయాలు, ఆందోళనలు తొలగి ఆత్మవిశ్వాసం రెట్టింపు అవుతుంది.',
      mantra: {
        sanskrit: 'ॐ दुं दुर्गायै नमः॥\nसर्वस्वरुपे सर्वेशे सर्वशक्ति समन्विते। भयेभ्यस्त्राहि नो देवि दुर्गे देवि नमोऽस्तु ते॥',
        telugu: 'ఓం దుం దుర్గాయై నమః॥\nసర్వస్వరూపే సర్వేశే సర్వశక్తి సమన్వితే। భయేభ్యస్త్రాహి నో దేవి దుర్గే దేవి నమోస్తు తే॥',
        translit: 'Om Dum Durgaayai Namah ||\nSarva-Svaroope Sarveshe Sarva-Shakti Samanvite | Bhayebhyas-Traahi No Devi Durge Devi Namo-stute ||',
        meaning_en: 'O Mother Durga, embodiment of all powers, ruler of all, protect us from all fears. Salutations to you, Divine Mother.',
        meaning_te: 'సకల శక్తుల స్వరూపిణి, సర్వలోకేశ్వరి అయిన దుర్గాభవాని, సమస్త భయాల నుండి మమ్ములను రక్షించుము.'
      },
      count: '11 or 108 times',
      count_te: '11 లేదా 108 సార్లు (లేదా దుర్గా ద్వాత్రింశన్నామ స్తోత్రం)',
      puja: {
        flowers_en: 'Red Hibiscus, Rose, Kumkum',
        flowers_te: 'ఎర్రటి మందారాలు, గులాబీలు, కుంకుమ',
        naivedyam_en: 'Lemon rice (Chitrannam), Payasam, Pomegranate seeds',
        naivedyam_te: 'పులిహోర, పరమాన్నం, దానిమ్మ గింజలు',
        charity_en: 'Distribute food and warm clothes to underprivileged women and girls.',
        charity_te: 'పేద మహిళలకు లేదా బాలికలకు తాంబూలం, ఆహారం అందించండి.'
      },
      story_en: 'Devi Durga manifested with weapons given by all the gods to slay the seemingly invincible Mahishasura, proving that righteous divine will always conquers darkness.',
      story_te: 'మహిషాసురుని ఆగడాలను అణచివేయడానికి దేవతలందరి శక్తులతో అవతరించిన దుర్గాదేవి అష్టమి నాడే దుష్టసంహారం ప్రారంభించింది. దుర్గా స్తోత్రం పఠించిన వారిని అమ్మ కంటికి రెప్పలా కాపాడుతుంది.'
    }
  ];

  /**
   * Generates the comprehensive Omkaram-style Worship Guide
   * for a given Panchang object and language.
   */
  function generateGuide(panchang, lang = 'en') {
    if (!panchang) return null;

    const isTe = (lang === 'te');
    const dayOfWeek = panchang.date.getDay();
    const weekdayData = WEEKDAY_DEITIES[dayOfWeek] || WEEKDAY_DEITIES[0];

    // Check for special vrata / festival override
    let specialObservance = null;
    for (const obs of SPECIAL_OBSERVANCES) {
      if (obs.match(panchang)) {
        specialObservance = obs;
        break;
      }
    }

    // Determine Presiding Deity & Main Content
    let deityName = '';
    let observanceTitle = '';
    let observanceBadge = '';
    let reasonText = '';
    let mainMantra = null;
    let mantraCount = '';
    let pujaDetails = null;
    let puranicStory = '';
    let specialPractice = '';

    if (specialObservance) {
      deityName = isTe ? specialObservance.deity_te : specialObservance.deity_en;
      observanceTitle = isTe ? specialObservance.name_te : specialObservance.name_en;
      observanceBadge = isTe ? specialObservance.badge_te : specialObservance.badge_en;
      reasonText = isTe ? specialObservance.reason_te : specialObservance.reason_en;
      mainMantra = specialObservance.mantra;
      mantraCount = isTe ? specialObservance.count_te : specialObservance.count;
      pujaDetails = specialObservance.puja;
      puranicStory = isTe ? specialObservance.story_te : specialObservance.story_en;
      specialPractice = isTe ? specialObservance.special_practice_te : specialObservance.special_practice_en;
    } else {
      deityName = isTe ? weekdayData.deity_te : weekdayData.deity_en;
      observanceTitle = isTe ? weekdayData.title_te : weekdayData.title_en;
      observanceBadge = isTe ? 'వార అధిష్టాన పూజ' : 'Daily Planetary & Presiding Worship';
      reasonText = isTe ? weekdayData.reason_te : weekdayData.reason_en;
      mainMantra = weekdayData.mantra;
      mantraCount = isTe ? weekdayData.count_te : weekdayData.count;
      pujaDetails = weekdayData.puja;
      puranicStory = isTe ? weekdayData.story_te : weekdayData.story_en;
      specialPractice = '';
    }

    // Weekday secondary mantra (always available)
    const weekdayMantra = {
      name: isTe ? weekdayData.weekday_mantra.name_te : weekdayData.weekday_mantra.name_en,
      text: isTe ? weekdayData.weekday_mantra.text_te : weekdayData.weekday_mantra.text_en,
      meaning: isTe ? '' : weekdayData.weekday_mantra.meaning_en
    };

    // Panchang summary line in selected language
    const panchangSummary = isTe
      ? `${panchang.masa.telugu} మాసం • ${panchang.paksha.telugu} • ${panchang.tithi.telugu} • ${panchang.vaaram.telugu} • ${panchang.nakshatra.telugu} నక్షత్రం`
      : `${panchang.masa.sanskrit} Month • ${panchang.paksha.name} • ${panchang.tithi.name} • ${panchang.vaaram.english} • ${panchang.nakshatra.name} Nakshatra`;

    return {
      panchangSummary,
      deityName,
      observanceTitle,
      observanceBadge,
      isSpecialObservance: !!specialObservance,
      reasonText,
      mainMantra: {
        sanskrit: isTe ? mainMantra.telugu : mainMantra.sanskrit,
        translit: isTe ? '' : (mainMantra.translit || ''),
        meaning: isTe ? mainMantra.meaning_te : mainMantra.meaning_en,
        count: mantraCount
      },
      weekdayMantra,
      puja: {
        flowers: isTe ? pujaDetails.flowers_te : pujaDetails.flowers_en,
        naivedyam: isTe ? pujaDetails.naivedyam_te : pujaDetails.naivedyam_en,
        charity: isTe ? pujaDetails.charity_te : pujaDetails.charity_en,
        specialPractice
      },
      puranicStory
    };
  }

  return {
    generateGuide,
    WEEKDAY_DEITIES,
    SPECIAL_OBSERVANCES
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DharmaGuide;
}
