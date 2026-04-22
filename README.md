# SWI Frontend

This repository contains a Vite + React + TypeScript frontend in the [`frontend`](./frontend) folder.

## Project Location

The app lives in:

```text
frontend/
```

## Run The App

In PowerShell, first move into the frontend folder:

```powershell
cd frontend
```

If `npm run dev` is blocked with a PowerShell execution-policy error, use one of these options.

### Option 1: Run npm through `npm.cmd`

This avoids the `npm.ps1` script entirely:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
```

You can use the same pattern for other scripts:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run build
& "C:\Program Files\nodejs\npm.cmd" run preview
```

### Option 2: Allow local PowerShell scripts for your user

If you want regular `npm run dev` to work in PowerShell, run this once in a PowerShell window:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then reopen PowerShell and run:

```powershell
cd frontend
npm run dev
```

## Available Scripts

From inside `frontend/`:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run dev
& "C:\Program Files\nodejs\npm.cmd" run build
& "C:\Program Files\nodejs\npm.cmd" run preview
```

## Verified

The production build was verified successfully from `frontend/` with:

```powershell
& "C:\Program Files\nodejs\npm.cmd" run build
```
