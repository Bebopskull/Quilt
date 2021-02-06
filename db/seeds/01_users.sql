INSERT INTO users (name, email, password)
  VALUES ('Ronald McDonald', 'bigmac@trans.fats', 'password');
INSERT INTO users (name, email, password)
  VALUES ('Sha Kira', 'hipsdontlie@yahoo.com', 'password');
INSERT INTO users (name, email, password)
  VALUES ('Hercules', 'greekgod_01@live.ca', 'password');
INSERT INTO users (name, email, password)
  VALUES ('Staceys Mom', 'has_got_it@going.on', 'password');

INSERT INTO categories (name, description)
  VALUES ('JS resources', 'A list of JavaScript resources for the beginner Web Developer');

INSERT INTO categories (name, description)
  VALUES ('My vegan Recipes', 'The yummiest vegan and gluten free recipes on the internet!');

INSERT INTO media_types (name, description)
  VALUES ('Website', 'Website');
INSERT INTO media_types (name, description)
  VALUES ('Video', 'Video');
INSERT INTO media_types (name, description)
  VALUES ('Image', 'Image');
INSERT INTO media_types (name, description)
  VALUES ('Audio', 'Audio');

INSERT INTO collections (name, user_id)
  VALUES ('Coding', 1);
INSERT INTO collections (name, user_id)
  VALUES ('Recipes', 2);

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'Python Tutor', 'http://pythontutor.com/visualize.html#mode=edit', 'A website to visualize code execution', 1, 1, '2021-02-08');

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'Git Cheet Sheet', 'http://rogerdudler.github.io/git-guide/files/git_cheat_sheet.pdf', 'A website with all of the git shortcuts', 1, 1, '2021-02-08');

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'JavaScript Array Explorer', 'https://sdras.github.io/array-explorer/', 'A website with all of the git shortcuts! Super helpful for beginners.', 1, 1, '2021-02-08');

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'PostgreSQL Data Types', 'https://www.postgresqltutorial.com/postgresql-data-types/', 'Overview of PostgreSQL data types, including Boolean, character, numeric, temporal, array, json, uuid, and special types.', 1, 1, '2021-02-08');

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'JavaScript Promises in 10 minutes', 'https://www.youtube.com/watch?v=DHvZLI7Db8E', 'Video about JS promises, great for beginners.', 2, 1, '2021-02-08');

INSERT INTO patches (user_id, title, url, description, category_id, media_type_id, created_at)
  VALUES (1, 'Object Creation in JavaScript', 'https://www.youtube.com/watch?v=GhbhD1HR5vk', '15 minute video on Object Creation by Fun Fun Function', 2, 1, '2021-02-08');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (1, 2, 4, 'Very helpful resource!', '2021-02-09');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (1, 3, 4.5, 'Sooo happy this exists!', '2021-02-09');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (2, 3, 3, 'Mediocre but maybe you will like it...', '2021-02-09');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (2, 2, 4, ':D', '2021-02-09');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (3, 2, 5, 'Love it!!!!', '2021-02-09');

INSERT INTO reviews (patch_id, user_id, rating, comment, created_at)
  VALUES (3, 3, 5, 'Game-changer.', '2021-02-09');
