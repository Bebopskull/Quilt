-Test commit -May
-Test commit -sarah


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
