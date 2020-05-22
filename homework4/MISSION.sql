USE Sopt;

SELECT * FROM Sopt.post;
/-- post 데이터의 개수 --/
SELECT COUNT(*) as cnt FROM Sopt.post;
/-- post title만 가져오기 --/
SELECT title FROM Sopt.post;
/-- 아무 값이나 INSERT 해보기 --/
INSERT INTO Sopt.post (author, title, content, createdAt) VALUES ('test','test','test',date_format(now(),'%m/%d/%Y'));
/-- postIdx가 3인 데이터 조회하기 --/
SELECT * FROM Sopt.post WHERE postIdx = 3;
/-- postIdx가 2인 post 개체들을 모두 출력하기 --/
SELECT * FROM Sopt.post WHERE postIDx = 2;
/-- 선택 ) post.sql 17 ~ 26을 실행시켰다면 userIdx가 4인 post+user 개체를 JOIN으로 출력해보기 --/
SELECT * FROM Sopt.post INNER JOIN Sopt.user ON Sopt.post.author = Sopt.user.userIdx WHERE userIdx =4;

/-- postIdx가 2인 데이터 날짜 현재로 수정하기 --/
UPDATE Sopt.post SET createdAt = date_format(now(),'%m/%d/%Y') WHERE postIdx =2;
/-- postIdx가 4인 데이터 지우기 --/
DELETE FROM Sopt.post WHERE postIdx=4;