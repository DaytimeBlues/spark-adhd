# Deployment Readiness Research + Project Review

## 1) What mature app teams do before deployment (the "how" and the "why")

### A. Code health and architecture checks
1. **Code review + risk review**
   - **How**: At least one reviewer validates correctness, edge cases, backward compatibility, and rollback plan.
   - **Why**: Human review catches logic errors and risky assumptions that test automation misses.
2. **Refactoring before release**
   - **How**: Remove dead code, reduce duplicated logic, isolate side effects, and split oversized components.
   - **Why**: Lower complexity reduces release risk and makes hotfixes safer/faster.
3. **Static analysis**
   - **How**: Run lints, type checks, formatting checks, and dependency audits.
   - **Why**: Prevent avoidable runtime defects and style drift.

### B. Test strategy before production
1. **Unit tests**
   - **How**: Validate pure logic, utilities, hooks, and service behavior, including edge conditions.
   - **Why**: Fast feedback and regression protection for core logic.
2. **Integration tests**
   - **How**: Verify interactions between screens/services/storage/network/auth.
   - **Why**: Most defects happen at boundaries between modules.
3. **End-to-end (E2E) tests**
   - **How**: Validate critical user journeys on real/simulated devices.
   - **Why**: Confirms app behavior from user perspective across navigation and state transitions.
4. **Release candidate smoke tests**
   - **How**: Quick checklist on the exact build artifact planned for release.
   - **Why**: Guards against environment/build-only regressions.

### C. Security, privacy, and reliability
1. **Secrets handling review**
   - **How**: Ensure secrets are not hardcoded; use environment-specific secure config.
   - **Why**: Reduces credential leakage risk and compliance exposure.
2. **Error handling and observability**
   - **How**: Standardize error logging/telemetry and avoid silent failures.
   - **Why**: Faster production diagnosis and safer incident response.
3. **Dependency and supply-chain checks**
   - **How**: Check lockfile consistency, vulnerable packages, and version drift.
   - **Why**: Prevent known CVEs and reproducibility failures in CI/CD.

### D. Release operations and rollback readiness
1. **Build reproducibility**
   - **How**: CI should install dependencies deterministically (`npm ci` or equivalent), then build.
   - **Why**: "Works on my machine" failures are eliminated.
2. **Release gating**
   - **How**: Block deployment on failed lint/test/build/security checks.
   - **Why**: Maintains quality threshold under schedule pressure.
3. **Rollback plan**
   - **How**: Keep a previous known-good artifact and quick rollback playbook.
   - **Why**: Minimizes blast radius during incidents.

---

## 2) Review of the current repository using the above standards

## A. Tooling/build readiness findings
1. **Lint pipeline currently broken in this environment**
   - `npm run lint` fails because ESLint v9 expects `eslint.config.js` (flat config), while project appears configured for legacy `.eslintrc` usage.
   - **Impact**: Static quality gate cannot run reliably.
2. **Test execution currently blocked by dependency state**
   - `npm test` failed with `jest: not found` prior to complete dependency setup.
   - `npm ci` fails because `package.json` and `package-lock.json` are out of sync (`prettier` mismatch).
   - **Impact**: Deterministic CI install is currently not possible.

## B. Code quality/refactoring findings
1. **Unused state in `HomeScreen`**
   - `lastUse` state is loaded but unused in rendering/logic.
   - **Why it matters**: Indicates dead state and potential unfinished behavior.
2. **Navigation dispatch is condition-heavy**
   - `HomeScreen` maps card IDs through a long `if/else` chain.
   - **Why it matters**: Harder to maintain and more error-prone as modes scale.
3. **Service layer consistency is mixed**
   - `StorageService` catches and logs errors, returning fallbacks.
   - `GoogleAuthService` often swallows errors to `null` with low diagnostics granularity.
   - **Why it matters**: Inconsistent error semantics complicate debugging and telemetry.

## C. Test coverage/risk findings
1. **Existing tests cover only a subset of behavior**
   - `HomeScreen` tests verify rendering/text presence but not navigation actions.
   - Hook/helper tests exist, which is good, but critical auth/storage integration paths are not covered.
2. **E2E tooling is present but not confirmed in this review run**
   - Detox/Playwright scripts exist, but dependency/install instability currently blocks confidence in executing the full pre-release matrix.

## D. Security/release hygiene findings
1. **Secret wiring exists but release hygiene needs enforcement**
   - `GoogleAuthService` imports `../config/secrets` directly.
   - `secrets.example.ts` is present, which is positive, but release check should verify no real secrets are committed.
2. **Lockfile drift is a release blocker**
   - `npm ci` failure indicates non-reproducible installs.
   - This is one of the most common root causes of failed CI/CD deployments.

---

## 3) Recommended pre-deployment action plan for this project

### Priority 0 (blockers before deploy)
1. Fix dependency reproducibility:
   - Sync `package-lock.json` with `package.json` and make `npm ci` pass.
2. Restore lint gate:
   - Either pin ESLint to compatible version or migrate to `eslint.config.js`.
3. Re-run baseline checks in CI:
   - `lint`, `test`, `build:web`, and Android debug/release build.

### Priority 1 (high-value quality/risk reduction)
1. Refactor `HomeScreen` navigation mapping:
   - Replace `if/else` with route lookup map.
2. Remove dead state (`lastUse`) or implement intended behavior.
3. Add tests for:
   - Mode card navigation behavior.
   - Storage/auth service edge cases and error paths.

### Priority 2 (operational excellence)
1. Add a release checklist document in repo:
   - Build artifact verification, smoke test list, rollback steps.
2. Standardize observability:
   - Structured logging + error boundaries for critical flows.
3. Add dependency/security scanning in CI.

---

## 4) Suggested CI deployment gate (minimum)
Deployment should be blocked unless all pass:
1. `npm ci`
2. `npm run lint`
3. `npm test -- --runInBand`
4. `npm run build:web`
5. `npm run build:android` (or equivalent release build in CI)

This gate aligns with mature team practice: deterministic install, static checks, functional validation, and artifact generation before production rollout.


## 5) Execution update (performed in-repo)

The following actions were executed to move from analysis to implementation:

1. **Refactored `HomeScreen` navigation dispatch**
   - Replaced the multi-branch `if/else` route selection with a route map lookup for maintainability and lower regression risk.
2. **Removed dead state from `HomeScreen`**
   - Removed the unused `lastUse` state/read path to reduce noise and potential confusion.
3. **Expanded test intent for HomeScreen**
   - Added a test to validate mode-card navigation dispatch (`Check In` -> `CheckIn`, `Ignite` -> `Focus`).

### Current execution status
- `npm run lint`: still blocked by ESLint v9 flat-config requirement (`eslint.config.js` missing).
- `npm test -- --runInBand`: still blocked because Jest binary is unavailable without successful dependency install.
- `npm install`: blocked by registry policy (`403 Forbidden` fetching `prettier`).

### Practical next step to fully execute release gates
1. Restore package install access (or mirror/allowlist required packages including `prettier`).
2. Sync lockfile and run `npm ci`.
3. Run gates: `lint`, `test`, `build:web`, and platform builds.
