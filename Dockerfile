# syntax = docker/dockerfile:1.2

FROM alpine:3.23
RUN apk add zig=0.15.2-r0
WORKDIR /app
COPY . .
RUN zig build -Denvironment=production -Doptimize=ReleaseSafe

FROM alpine:3.23
WORKDIR /app
COPY --from=0 app/zig-out/assets assets
COPY --from=0 app/zig-out/bin/lucky-dog bin/lucky-dog

ENTRYPOINT ["bin/lucky-dog"]
CMD ["server"]

EXPOSE $PORT
