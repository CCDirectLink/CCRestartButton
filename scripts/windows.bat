@echo off
REM up to 5 times at ~1 second intervals (though it almost always works first try)
FOR /L %%a IN (1,1,5) DO (
    REM why does windows not have a sleep command?
    REM there is timeout, but it does not work in background processes
    ping 127.0.0.1 -n 2 > NUL

    REM if CrossCode.exe is not running start it
    tasklist | find "CrossCode.exe" || (
        start CrossCode.exe
        goto :eof
    )
)
