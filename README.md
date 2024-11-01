#Branches and merges guildlines
##Master Branches
- master: This branch always contains production-ready code. Only tested, stable features should be merged here.
- develop: This is the integration branch for features and fixes. It contains the latest code and is used for staging and testing before merging into main.
Supporting Branches
- Feature branches (feature/): These are used for developing new features.

##Naming convention: feature/short-description
Example: feature/user-authentication
Bugfix branches (fix/): These are used to fix bugs in the codebase.

##Naming convention: fix/short-description
Example: fix/login-page-error
Chore branches (chore/): Used for maintenance tasks such as dependency updates, refactoring, and other non-feature/non-bug work.

##Naming convention: chore/short-description
Example: chore/update-dependencies
Hotfix branches (hotfix/): Used for critical fixes that need to be applied directly to main.

##Naming convention: hotfix/short-description
Example: hotfix/critical-bug-fix


#Git Commit Guidelines: Conventional Commits
We follow the Conventional Commits specification to maintain clear and structured commit history. This helps in better collaboration, automation, and release management. Below are the common commit message types and their usage:

##Commit Message Structure##
Each commit message should follow this format:


###<type>: <short summary>
- type: Describes the category of the change (see the list of types below).
- short summary: A concise description of the change.
Common Commit Types
- feat: A new feature is introduced to the codebase.

##Example: feat: add user authentication##
fix: A bug fix is made.

##Example: fix: resolve crash on login page
chore: Routine tasks that don't modify application behavior (e.g., updating dependencies).

##Example: chore: update npm dependencies
docs: Documentation-related changes.

##Example: docs: add API usage examples to README
style: Changes that don't affect the logic, such as formatting, white-space, or code styling.

##Example: style: fix indentation in service file
refactor: Code changes that neither add a feature nor fix a bug, but improve code structure.

##Example: refactor: simplify user data fetching logic
test: Adding or modifying tests.

##Example: test: add unit tests for auth middleware
perf: Changes made to improve performance.

##Example: perf: optimize image loading for faster page load
build: Changes to the build process or external dependencies.

##Example: build: update webpack config for production mode
Additional Considerations
Breaking Changes: If your change introduces a breaking change, include BREAKING CHANGE: in the commit body, followed by an explanation.

##Example: feat: add support for new API endpoint BREAKING CHANGE: API v1 is deprecated, use v2##
Footers: Footers can be added to reference issues or PRs.

##Example: fix: resolve login issue closes #42##
By following this commit message format, we ensure that our codebase remains clean, consistent, and easy to navigate.
