DROP TYPE IF EXISTS brand_produs;
DROP TYPE IF EXISTS tipuri_arme;

CREATE TYPE brand_produs AS ENUM( 'KWA', 'Tokyo Marui', 'Krytac', 'Lancer Tactical', 'Cybergun','Umarex');
CREATE TYPE tipuri_arme AS ENUM('Arma de asalt', 'Pistol', 'SMG', 'Pusca cu luneta')

CREATE TABLE IF NOT EXISTS produse (
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   principiu_functionare VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   distanta_de_bataie INT NOT NULL CHECK (distanta_de_bataie>0),   
   tip_produs tipuri_arme DEFAULT 'Arma de asalt',
   brand brand_produs DEFAULT 'KWA',
   accesorii_compatibile VARCHAR [], --pot sa nu fie specificare deci nu punem NOT NULL
   garantie BOOLEAN NOT NULL DEFAULT TRUE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);

INSERT into produse (nume,principiu_functionare,descriere,pret, distanta_de_bataie, tip_produs, brand, accesorii_compatibile, garantie, imagine) VALUES 

('AAC Honey Badger','pe gaz', 'Compacta', 350.30, 300, 'Arma de asalt', 'KWA','{"luneta", "incarcator extins", "laser"}', True, 'honey-badger.jpg'),

('AR-15','electronic', 'Semi-automat, extrem de popular și versatil', 500.50, 600, 'Arma de asalt', 'Tokyo Marui','{"luneta", "incarcator extins"}', True, 'ar-15.jpg'),

('AK-47','pe gaz', 'Datorită designului său simplu este ușor de întreținut și poate funcționa într-o varietate de medii și condiții', 600.00, 550, 'Arma de asalt', 'Lancer Tactical','{"luneta", "incarcator extins", "laser"}', True, 'ak-47.jpg'),

('HK33','pe gaz', 'Cunoscut pentru ergonomia sa îmbunătățită în comparație cu alte fusiluri din aceeași clasă', 400.20, 330, 'Arma de asalt', 'Cybergun','{"incarcator extins"}', True, 'HK33.jpg'),

('Berretta M9','pe gaz', 'Semi-automată cu aer comprimat și acționare pe gaz', 100.50, 100, 'Pistol', 'Umarex','{"incarcator extins", "laser"}', True, 'berretta.jpg'),

('Desert Eagle','pe gaz', 'Adesea folosită în filme, jocuri video și alte forme de divertisment, unde este prezentată ca o armă emblematică a puterii și a intimidării.', 250.50, 300, 'Pistol', 'KWA','{"laser", "luneta"}', True, 'desert-eagle.jpg'),

('FN Five-Seven','electronic', 'Cunoscut pentru fiabilitatea și precizia sa', 400.99, 250, 'Pistol', 'Krytac','{"incarcator extins", "laser", "luneta"}', True, 'five-seven.jpg'),

('Glock-19','electronic', 'Una dintre cele mai recunoscute și utilizate arme de foc în întreaga lume.', 350.00, 150, 'Pistol', 'Umarex','{"incarcator extins", "laser", "luneta"}', True, 'glock.jpg'),

('FN P90','electronic', 'Configurația sa bullpup distincta, ceea ce înseamnă că mecanismul de acționare și cartușul sunt amplasate în spatele mânerului pistolului.', 370.20, 260, 'SMG', 'Tokyo Marui','{"laser", "luneta", "lanterna"}', True, 'p90.jpg'),

('KRISS Vector','pe gaz', 'Configurația sa bullpup distincta, ceea ce înseamnă că mecanismul de acționare și cartușul sunt amplasate în spatele mânerului pistolului.', 330.50, 280, 'SMG', 'KWA','{"laser", "luneta", "lanterna"}', True, 'vector.jpg'),

('MAC-11','electronic', 'Rata mare de foc si dimensiuni reduse', 150.00, 75, 'SMG', 'Krytac','{"nu suporta accesorii"}', True, 'mac.jpg'),

('AR-57','electronic', 'AR-57 păstrează multe dintre caracteristicile designului AR-15, inclusiv corpul și sistemul de acționare', 250.00, 85, 'SMG', 'Lancer Tactical','{"incarcator extins", "laser", "luneta"}', True, 'ar-57.jpg'),

('AW50','pe gaz', 'Pușcă de precizie semiautomată, cunoscută pentru puterea sa de foc și precizia sa la distanțe lungi.', 650.00, 800, 'Pusca cu luneta', 'Lancer Tactical','{"luneta"}', True, 'AW50.jpg'),

('AR10T','electronic', 'Această pușcă de precizie este echipată cu o țeavă lungă și robustă, care maximizează precizia și puterea la distanțe lungi.', 750.00, 700, 'Pusca cu luneta', 'Umarex','{"luneta","incarcator extins","laser"}', True, 'AR10T.jpg'),

('Berrett M82','electronic', ' Cunosctua si drept Light Fifty este proiectată pentru a furniza o precizie excelentă și o putere de oprire considerabilă la distanțe lungi.', 1050.00, 950, 'Pusca cu luneta', 'KWA','{"luneta"}', True, 'berrett.jpg'),

('Dragunov SVD','electronic', 'Pușcă clasica de pe timpul Uniunii Sovietice', 950.00, 850, 'Pusca cu luneta', 'Lancer Tactical','{"luneta","laser"}', True, 'SVD.jpg'),

