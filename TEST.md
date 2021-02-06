-Test commit -May
-Test commit -sarahhhhhhhhhhhhhhhhhhhh


Work Process:

To work on a new branch (please do):
git checkout -b newBranch
git pull

-do code-

git add.
git commit -m "message"

git pull origin master (if someone has done changes)
-solve any conflicts and git add git commit again

git push origin newBranch

Once the branch is error free:
git checkout master  
>referring to local master

git merge newBranch TO MERGE your local branch to your local master

git push origin master to merge your local master with the remote master.

--DELETING A BRANCH (locally)
1) get out of the branch 
git checkout master
2) delete the branch locally
git branch --delete newbranch

--DELETING A BRANCH (on github)
1) git push origin --delete newbranch
