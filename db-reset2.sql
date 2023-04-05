DROP DATABASE upside;

CREATE DATABASE upside;

USE upside;

DROP TABLE IF EXISTS projects;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS usersProjects;

CREATE TABLE
    IF NOT EXISTS users(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        password VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        isIntern BOOLEAN NOT NULL,
        avatar TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS projects(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nameProject VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        projectDesc TEXT,
        client VARCHAR(100) NOT NULL,
        subsidiary VARCHAR(255) NOT NULL,
        startDate DATE,
        finalDate DATE,
        progress INT NOT NULL,
        industryTag VARCHAR(100) NOT NULL,
        color VARCHAR(100) NOT NULL,
        projectManager VARCHAR(100) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS usersProjects(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idUser INT NOT NULL,
        idProject INT NOT NULL,
        CONSTRAINT fk_usersProjects_users FOREIGN KEY (idUser) REFERENCES users(id),
        CONSTRAINT fk_usersProjects_projects FOREIGN KEY (idProject) REFERENCES projects(id)
    );

INSERT INTO
    users (
        firstname,
        lastname,
        email,
        password,
        isIntern,
        avatar
    )
VALUES
(
        'Lydie',
        'Pluvinage',
        'lydie.pluvinage@wildcodeschool.com',
        "testmdp",
        true,
        "avatar"
    );

INSERT INTO
    projects (
        nameProject,
        image,
        projectDesc,
        client,
        subsidiary,
        startDate,
        finalDate,
        progress,
        industryTag,
        color,
        projectManager
    )
VALUES
(
        'Agri-cool',
        'https://upload.wikimedia.org/wikipedia/commons/c/cc/Pellenc-Logo-Web.jpg',
        "Pellenc souhaitait développer un prototype de logiciel embarqué permettant de gérer le système de pulvérisation dans les vignes. Disposant déjà d’un logiciel rdestiné aux vignes larges, elle s’est adressée à Apside pour l’aider à développer un logiciel propre aux vignes étroites. Le logiciel est basé sur les mêmes tracteurs, mais le système est de fait différent. Nos équipes ont ainsi travaillé sur ce logiciel embarqué qui permet de piloter tous les éléments de la machine, de gérer le système de pulvérisation, d’ouvrir ou fermer les vannes, de faire circuler du produit, etc. ",
        'Pellenc',
        'Aix-en-provence',
        '2022-06-02',
        '2022-10-01',
        0.7,
        'agricole',
        "blue",
        'Jacques Dutronc'
    ),
(
        'Ecp-ariane',
        'https://media.glassdoor.com/sqll/1777340/arianegroup-squarelogo-1524488326917.png',
        'Dans un but continu d’améliorer la qualité des approvisionnements, l’ingénieur assurance qualité fournisseur (SQM) apporte son expertise pour animer les groupes d’instruction des non-conformités, assurer la mise en place des actions définies et approuvées par le fournisseur et vérifier l’efficacité des actions soldées chez les fournisseurs. Lorsque cela est nécessaire, le SQM se déplace chez le fournisseur pour compléter ses évaluations.',
        'Ariane group',
        'Bordeaux',
        '2021-10-22',
        '2023-04-01',
        0.7,
        'Aero-spacial',
        "blue",
        'André-Hubert Roussel '
    ),
(
        'Evolution 3 ',
        'https://www.saftbatteries.com/sites/all/themes/custom/saft_batteries/library/images/logos/saft-logo2.png',
        'La technologie lithium-ion (Li-ion) offre de nombreux avantages en termes de performances, de capacité et de plage de température de fonctionnement par rapport à la technologie à base de nickel. Les batteries utilisant cette technologie permettent de répondre aux besoins des fournisseurs d’équipements de télécommunication et opérateurs réseaux, leur garantissant une continuité totale de service.',
        'saft',
        'Bordeaux',
        '2022-02-12',
        '2024-10-01',
        0.7,
        'retail',
        "blue",
        'Ghislain Lescuyer'
    ),
(
        'HoloLens',
        'https://img2.freepng.fr/20180501/dee/kisspng-virtual-reality-headset-microsoft-hololens-samsung-5ae825690637d1.0972398215251633690255.jpg',
        'Les industriels investissent de plus en plus dans les nouvelles technologies, en particulier dans la Réalité Virtuelle (VR) et la Réalité Augmentée (RA). Grâce à une étude de marché initiée par Apside Aix et son Directeur Technique et Recherche & Développement, il est apparu que de grands industriels tels que Thyssen-Krupp, Renault Trucks, Dassault, Safran, ou encore Airbus Group ont investi sur ces technologies de réalités mixtes.',
        'Microsoft hololens',
        'Lyon',
        '2022-06-02',
        '2022-10-01',
        0.7,
        'retail',
        "blue",
        'Alex Kipman'
    ),
(
        'StarTour',
        'https://ibb.co/QmQQ4sd',
        "Vous permettre de vivre un dépaysement total, en vous proposant des séjours all-inclusive vers 28 destinations toutes plus différentes les unes que les autres, des mondes du noyau jusqu'aux confins de la bordure extérieure.",
        'Wild Code Scool',
        'Biarritz',
        '2022-06-02',
        '2022-10-01',
        0.7,
        'retail',
        "blue",
        'Nicolas Vagnoux'
    ),
    (
        'Supervision',
        'https://www.passmalin.fr/fileadmin/_processed_/a/0/csm_LOGO_SNCF_GROUPE_RVB_708b29e436.png',
        'En 2018, la division COP a demandé à Apside de l’accompagner dans la transformation de son modèle de delivery de supervision applicative. Face aux sollicitations des équipes infrastructures, applicatives et métiers, il fallait gagner en capacité et en efficacité de traitement de projets de supervision de plus en plus variés et complexes.
Nous avons transformé un modèle tout Assistance Technique vers un Centre de Compétences avec un modèle de délivrance en mode projets et demande de service de supervision.
Cette évolution du mode de delivery a impliqué un renfort de nos effectifs, le passage à un engagement de résultats et un renforcement de nos compétences sur des outils de supervision complexes.',
        'SNCF',
        'Lyon',
        '2022-06-02',
        '2022-10-01',
        70,
        'transport',
        'blue',
        'Monica Sanchez'
    ),
    (
        'UX DESIGNER',
        'https://www.1min30.com/wp-content/uploads/2017/08/Logo-EDF-1.jpg',
        'Dans le cadre de la création d’une application de gestion téléphonique, EDF a fait appel à Apside pour une prestation dédiée à l’UX Design.

Le besoin de notre client, évoluant dans un contexte projet agile, est d’intégrer toutes les parties-prenantes dès la phase de conception de l’application. En intégrant un UX designer, celui-ci a pour rôle de couvrir à la fois la partie fonctionnelle mais également d’assurer une conception centrée sur les besoins des utilisateurs finaux.',
        'EDF',
        'Paris',
        '2022-06-02',
        '2022-10-01',
        70,
        'service public',
        'blue',
        'Jean-Bernard Lévy'
    ),
    (
        'Conseil en organisation',
        'https://previews.123rf.com/images/butenkow/butenkow1506/butenkow150600042/40902334-assurance-logo-de-qualit%C3%A9-de-vecteur-ronde.jpg',
        'L’entreprise choisit de faire un séminaire extraordinaire, pour déterminer un nouveau mode de fonctionnement pour le CODIR, et rétablir sa cohésion. Elle fait appel à Apside, et lui confie la mission de les accompagner dans cette étape, en préparant et animant ce séminaire.',
        'assurances',
        'Lile',
        '2022-06-02',
        '2022-10-01',
        70,
        'service public',
        'blue',
        'Vincent et Camille '
    );
