## USER     
|userIdx(PK)|id|name|password|
|--|------|---|---|
|0|dudgns|최영훈|1234|

## Article        
|articleIdx(PK)|userIdx(FK)|title|content|
|---|---|------|---|---|-----|
|0|0|제목|내용내용|

## Comment      
|CommentIdx(PK)|ArticleIdx(FK)|userIdx(FK)|commentContent|
|--|------|---|---|
|0|0|0|정말 좋은글입니다.!|

## LIKE        
LikeIdx(PK)|ArticleIdx(FK)|userIdx(FK)|
|---|--|------|
|0|1|1|